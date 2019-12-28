# 第 7 章 Error Handling
Image

Image

by Michael Feathers

Image

It might seem odd to have a section about error handling in a book about clean code. Error handling is just one of those things that we all have to do when we program. Input can be abnormal and devices can fail. In short, things can go wrong, and when they do, we as programmers are responsible for making sure that our code does what it needs to do.

The connection to clean code, however, should be clear. Many code bases are completely dominated by error handling. When I say dominated, I don’t mean that error handling is all that they do. I mean that it is nearly impossible to see what the code does because of all of the scattered error handling. Error handling is important, but if it obscures logic, it’s wrong.

In this chapter I’ll outline a number of techniques and considerations that you can use to write code that is both clean and robust—code that handles errors with grace and style.

USE EXCEPTIONS RATHER THAN RETURN CODES
Back in the distant past there were many languages that didn’t have exceptions. In those languages the techniques for handling and reporting errors were limited. You either set an error flag or returned an error code that the caller could check. The code in Listing 7-1 illustrates these approaches.


Listing 7-1 DeviceController.java
```java
   public class DeviceController {
     …
     public void sendShutDown() {
       DeviceHandle handle = getHandle(DEV1);
       // Check the state of the device
       if (handle != DeviceHandle.INVALID) {
         // Save the device status to the record field
         retrieveDeviceRecord(handle);
         // If not suspended, shut down
         if (record.getStatus() != DEVICE_SUSPENDED) {
           pauseDevice(handle);
           clearDeviceWorkQueue(handle);
           closeDevice(handle);
         } else {
           logger.log("Device suspended.  Unable to shut down");
         }
       } else {
         logger.log("Invalid handle for: " + DEV1.toString());
       }
     }
     …
   }
```
The problem with these approaches is that they clutter the caller. The caller must check for errors immediately after the call. Unfortunately, it’s easy to forget. For this reason it is better to throw an exception when you encounter an error. The calling code is cleaner. Its logic is not obscured by error handling.

Listing 7-2 shows the code after we’ve chosen to throw exceptions in methods that can detect errors.


Listing 7-2 DeviceController.java (with exceptions)
```java
   public class DeviceController {
     …
     
     public void sendShutDown() {
       try {
         tryToShutDown();
       } catch (DeviceShutDownError e) {
         logger.log(e);
       }
   }
 
    private void tryToShutDown() throws DeviceShutDownError {
      DeviceHandle handle = getHandle(DEV1);
      DeviceRecord record = retrieveDeviceRecord(handle);
 
      pauseDevice(handle);
      clearDeviceWorkQueue(handle);
      closeDevice(handle);
   }
 
     private DeviceHandle getHandle(DeviceID id) {
     …
     throw new DeviceShutDownError(“Invalid handle for: ” + id.toString());
     …
    }
 
    …
   } 
```
Notice how much cleaner it is. This isn’t just a matter of aesthetics. The code is better because two concerns that were tangled, the algorithm for device shutdown and error handling, are now separated. You can look at each of those concerns and understand them independently.

WRITE YOUR TRY-CATCH-FINALLY STATEMENT FIRST
One of the most interesting things about exceptions is that they define a scope within your program. When you execute code in the try portion of a try-catch-finally statement, you are stating that execution can abort at any point and then resume at the catch.

In a way, try blocks are like transactions. Your catch has to leave your program in a consistent state, no matter what happens in the try. For this reason it is good practice to start with a try-catch-finally statement when you are writing code that could throw exceptions. This helps you define what the user of that code should expect, no matter what goes wrong with the code that is executed in the try.

Let’s look at an example. We need to write some code that accesses a file and reads some serialized objects.

We start with a unit test that shows that we’ll get an exception when the file doesn’t exist:
```java
   @Test(expected = StorageException.class)
   public void retrieveSectionShouldThrowOnInvalidFileName() {
     sectionStore.retrieveSection(“invalid - file”);
   }
```
The test drives us to create this stub:
```java
   public List<RecordedGrip> retrieveSection(String sectionName) {
     // dummy return until we have a real implementation
     return new ArrayList<RecordedGrip>();
   }
```
Our test fails because it doesn’t throw an exception. Next, we change our implementation so that it attempts to access an invalid file. This operation throws an exception:
```java
   public List<RecordedGrip> retrieveSection(String sectionName) {
     try {
       FileInputStream stream = new FileInputStream(sectionName)
     } catch (Exception e) {
       throw new StorageException(“retrieval error”, e);
     }
     return new ArrayList<RecordedGrip>();
   }
```
Our test passes now because we’ve caught the exception. At this point, we can refactor. We can narrow the type of the exception we catch to match the type that is actually thrown from the FileInputStream constructor: FileNotFoundException:
```java
   public List<RecordedGrip> retrieveSection(String sectionName) {
     try {
       FileInputStream stream = new FileInputStream(sectionName);
       stream.close();
     } catch (FileNotFoundException e) {
       throw new StorageException(“retrieval error”, e);
     }
     return new ArrayList<RecordedGrip>();
   }
```
Now that we’ve defined the scope with a try-catch structure, we can use TDD to build up the rest of the logic that we need. That logic will be added between the creation of the FileInputStream and the close, and can pretend that nothing goes wrong.

Try to write tests that force exceptions, and then add behavior to your handler to satisfy your tests. This will cause you to build the transaction scope of the try block first and will help you maintain the transaction nature of that scope.

USE UNCHECKED EXCEPTIONS
The debate is over. For years Java programmers have debated over the benefits and liabilities of checked exceptions. When checked exceptions were introduced in the first version of Java, they seemed like a great idea. The signature of every method would list all of the exceptions that it could pass to its caller. Moreover, these exceptions were part of the type of the method. Your code literally wouldn’t compile if the signature didn’t match what your code could do.

At the time, we thought that checked exceptions were a great idea; and yes, they can yield some benefit. However, it is clear now that they aren’t necessary for the production of robust software. C# doesn’t have checked exceptions, and despite valiant attempts, C++ doesn’t either. Neither do Python or Ruby. Yet it is possible to write robust software in all of these languages. Because that is the case, we have to decide—really—whether checked exceptions are worth their price.

What price? The price of checked exceptions is an Open/Closed Principle1 violation. If you throw a checked exception from a method in your code and the catch is three levels above, you must declare that exception in the signature of each method between you and the catch. This means that a change at a low level of the software can force signature changes on many higher levels. The changed modules must be rebuilt and redeployed, even though nothing they care about changed.

1. [Martin].

Consider the calling hierarchy of a large system. Functions at the top call functions below them, which call more functions below them, ad infinitum. Now let’s say one of the lowest level functions is modified in such a way that it must throw an exception. If that exception is checked, then the function signature must add a throws clause. But this means that every function that calls our modified function must also be modified either to catch the new exception or to append the appropriate throws clause to its signature. Ad infinitum. The net result is a cascade of changes that work their way from the lowest levels of the software to the highest! Encapsulation is broken because all functions in the path of a throw must know about details of that low-level exception. Given that the purpose of exceptions is to allow you to handle errors at a distance, it is a shame that checked exceptions break encapsulation in this way.

Checked exceptions can sometimes be useful if you are writing a critical library: You must catch them. But in general application development the dependency costs outweigh the benefits.

PROVIDE CONTEXT WITH EXCEPTIONS
Each exception that you throw should provide enough context to determine the source and location of an error. In Java, you can get a stack trace from any exception; however, a stack trace can’t tell you the intent of the operation that failed.

Create informative error messages and pass them along with your exceptions. Mention the operation that failed and the type of failure. If you are logging in your application, pass along enough information to be able to log the error in your catch.

DEFINE EXCEPTION CLASSES IN TERMS OF A CALLER’S NEEDS
There are many ways to classify errors. We can classify them by their source: Did they come from one component or another? Or their type: Are they device failures, network failures, or programming errors? However, when we define exception classes in an application, our most important concern should be how they are caught.

Let’s look at an example of poor exception classification. Here is a try-catch-finally statement for a third-party library call. It covers all of the exceptions that the calls can throw:
```java
   ACMEPort port = new ACMEPort(12);
 
   try {
     port.open();
   } catch (DeviceResponseException e) {
     reportPortError(e);
     logger.log(“Device response exception”, e);
   } catch (ATM1212UnlockedException e) {
     reportPortError(e);
     logger.log(“Unlock exception”, e);
   } catch (GMXError e) {
     reportPortError(e);
     logger.log(“Device response exception”);
   } finally {
     …
   }
```
That statement contains a lot of duplication, and we shouldn’t be surprised. In most exception handling situations, the work that we do is relatively standard regardless of the actual cause. We have to record an error and make sure that we can proceed.

In this case, because we know that the work that we are doing is roughly the same regardless of the exception, we can simplify our code considerably by wrapping the API that we are calling and making sure that it returns a common exception type:
```java
   LocalPort port = new LocalPort(12);
   try {
     port.open();
   } catch (PortDeviceFailure e) {
     reportError(e);
     logger.log(e.getMessage(), e);
   } finally {
     …
   }
```
Our LocalPort class is just a simple wrapper that catches and translates exceptions thrown by the ACMEPort class:
```java
   public class LocalPort {
     private ACMEPort innerPort;
 
     public LocalPort(int portNumber) {
       innerPort = new ACMEPort(portNumber);
     }
 
     public void open() {
       try {
         innerPort.open();
       } catch (DeviceResponseException e) {
         throw new PortDeviceFailure(e);
       } catch (ATM1212UnlockedException e) {
         throw new PortDeviceFailure(e);
       } catch (GMXError e) {
         throw new PortDeviceFailure(e);
       }
     }
     …
   }
```
Wrappers like the one we defined for ACMEPort can be very useful. In fact, wrapping third-party APIs is a best practice. When you wrap a third-party API, you minimize your dependencies upon it: You can choose to move to a different library in the future without much penalty. Wrapping also makes it easier to mock out third-party calls when you are testing your own code.

One final advantage of wrapping is that you aren’t tied to a particular vendor’s API design choices. You can define an API that you feel comfortable with. In the preceding example, we defined a single exception type for port device failure and found that we could write much cleaner code.

Often a single exception class is fine for a particular area of code. The information sent with the exception can distinguish the errors. Use different classes only if there are times when you want to catch one exception and allow the other one to pass through.

DEFINE THE NORMAL FLOW
If you follow the advice in the preceding sections, you’ll end up with a good amount of separation between your business logic and your error handling. The bulk of your code will start to look like a clean unadorned algorithm. However, the process of doing this pushes error detection to the edges of your program. You wrap external APIs so that you can throw your own exceptions, and you define a handler above your code so that you can deal with any aborted computation. Most of the time this is a great approach, but there are some times when you may not want to abort.

Image

Let’s take a look at an example. Here is some awkward code that sums expenses in a billing application:
```java
   try {
     MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
     m_total += expenses.getTotal();
   } catch(MealExpensesNotFound e) {
     m_total += getMealPerDiem();
   }
```
In this business, if meals are expensed, they become part of the total. If they aren’t, the employee gets a meal per diem amount for that day. The exception clutters the logic. Wouldn’t it be better if we didn’t have to deal with the special case? If we didn’t, our code would look much simpler. It would look like this:
```java
   MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
   m_total += expenses.getTotal();

Can we make the code that simple? It turns out that we can. We can change the ExpenseReportDAO so that it always returns a MealExpense object. If there are no meal expenses, it returns a MealExpense object that returns the per diem as its total:
```java
   public class PerDiemMealExpenses implements MealExpenses {
     public int getTotal() {
       // return the per diem default
     }
   }
```
This is called the SPECIAL CASE PATTERN [Fowler]. You create a class or configure an object so that it handles a special case for you. When you do, the client code doesn’t have to deal with exceptional behavior. That behavior is encapsulated in the special case object.

DON’T RETURN NULL
I think that any discussion about error handling should include mention of the things we do that invite errors. The first on the list is returning null. I can’t begin to count the number of applications I’ve seen in which nearly every other line was a check for null. Here is some example code:
```java
   public void registerItem(Item item) {
     if (item != null) {
       ItemRegistry registry = peristentStore.getItemRegistry();
       if (registry != null) {
         Item existing = registry.getItem(item.getID());
         if (existing.getBillingPeriod().hasRetailOwner()) {
           existing.register(item);
         }
       }
     }
   }
```
If you work in a code base with code like this, it might not look all that bad to you, but it is bad! When we return null, we are essentially creating work for ourselves and foisting problems upon our callers. All it takes is one missing null check to send an application spinning out of control.

Did you notice the fact that there wasn’t a null check in the second line of that nested if statement? What would have happened at runtime if persistentStore were null? We would have had a NullPointerException at runtime, and either someone is catching NullPointerException at the top level or they are not. Either way it’s bad. What exactly should you do in response to a NullPointerException thrown from the depths of your application?

It’s easy to say that the problem with the code above is that it is missing a null check, but in actuality, the problem is that it has too many. If you are tempted to return null from a method, consider throwing an exception or returning a SPECIAL CASE object instead. If you are calling a null-returning method from a third-party API, consider wrapping that method with a method that either throws an exception or returns a special case object.

In many cases, special case objects are an easy remedy. Imagine that you have code like this:
```java
   List<Employee> employees = getEmployees();
   if (employees != null) {
     for(Employee e : employees) {
       totalPay += e.getPay();
     }
   }
```
Right now, getEmployees can return null, but does it have to? If we change getEmployee so that it returns an empty list, we can clean up the code:
```java
   List<Employee> employees = getEmployees();
   for(Employee e : employees) {
     totalPay += e.getPay();
   }
```
Fortunately, Java has Collections.emptyList(), and it returns a predefined immutable list that we can use for this purpose:
```java
   public List<Employee> getEmployees() {
     if( .. there are no employees .. )
       return Collections.emptyList();
   }
```
If you code this way, you will minimize the chance of NullPointerExceptions and your code will be cleaner.

DON’T PASS NULL
Returning null from methods is bad, but passing null into methods is worse. Unless you are working with an API which expects you to pass null, you should avoid passing null in your code whenever possible.

Let’s look at an example to see why. Here is a simple method which calculates a metric for two points:
```java
   public class MetricsCalculator
   {
     public double xProjection(Point p1, Point p2) {
       return (p2.x – p1.x) * 1.5;
     }
     …
   }
```
What happens when someone passes null as an argument?
```java
   calculator.xProjection(null, new Point(12, 13));

We’ll get a NullPointerException, of course.

How can we fix it? We could create a new exception type and throw it:
```java
   public class MetricsCalculator
   {
    public double xProjection(Point p1, Point p2) {
      if (p1 == null || p2 == null) {
         throw InvalidArgumentException(
           “Invalid argument for MetricsCalculator.xProjection”);
      }
      return (p2.x – p1.x) * 1.5;
    }
   }
```
Is this better? It might be a little better than a null pointer exception, but remember, we have to define a handler for InvalidArgumentException. What should the handler do? Is there any good course of action?

There is another alternative. We could use a set of assertions:
```java
   public class MetricsCalculator
   {
     public double xProjection(Point p1, Point p2) {
       assert p1 != null : “p1 should not be null”;
       assert p2 != null : “p2 should not be null”;
       return (p2.x – p1.x) * 1.5;
     }
   }
```
It’s good documentation, but it doesn’t solve the problem. If someone passes null, we’ll still have a runtime error.

In most programming languages there is no good way to deal with a null that is passed by a caller accidentally. Because this is the case, the rational approach is to forbid passing null by default. When you do, you can code with the knowledge that a null in an argument list is an indication of a problem, and end up with far fewer careless mistakes.

CONCLUSION
Clean code is readable, but it must also be robust. These are not conflicting goals. We can write robust clean code if we see error handling as a separate concern, something that is viewable independently of our main logic. To the degree that we are able to do that, we can reason about it independently, and we can make great strides in the maintainability of our code.