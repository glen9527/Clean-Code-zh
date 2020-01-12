# 第 7 章 Error Handling 错误处理

by Michael Feathers

![](figures/ch7/103fig01.jpg)

It might seem odd to have a section about error handling in a book about clean code. Error handling is just one of those things that we all have to do when we program. Input can be abnormal and devices can fail. In short, things can go wrong, and when they do, we as programmers are responsible for making sure that our code does what it needs to do.

> 在一本有关整洁代码的书中，居然有讨论错误处理的章节，看起来有些突兀。错误处理只不过是编程时必须要做的事之一。输入可能出现异常，设备可能失效。简言之，可能会出错，当错误发生时，程序员就有责任确保代码照常工作。

The connection to clean code, however, should be clear. Many code bases are completely dominated by error handling. When I say dominated, I don’t mean that error handling is all that they do. I mean that it is nearly impossible to see what the code does because of all of the scattered error handling. Error handling is important, but if it obscures logic, it’s wrong.

> 然而，应该弄清楚错误处理与整洁代码的关系。许多程序完全由错误处理所占据。所谓占据，并不是说错误处理就是全部。我的意思是几乎无法看明白代码所做的事，因为到处都是凌乱的错误处理代码。错误处理很重要，但如果它搞乱了代码逻辑，就是错误的做法。

In this chapter I’ll outline a number of techniques and considerations that you can use to write code that is both clean and robust—code that handles errors with grace and style.

> 在本章中，我将概要列出编写既整洁又强固的代码——雅致地处理错误代码的一些技巧和思路。

## 7.1 USE EXCEPTIONS RATHER THAN RETURN CODES 使用异常而非返回码

Back in the distant past there were many languages that didn’t have exceptions. In those languages the techniques for handling and reporting errors were limited. You either set an error flag or returned an error code that the caller could check. The code in Listing 7-1 illustrates these approaches.

> 在很久以前，许多语言都不支持异常。这些语言处理和汇报错误的手段都有限。你要么设置一个错误标识，要么返回给调用者检查的错误码。代码清单 7-1 中的代码展示了这些手段。

Listing 7-1 DeviceController.java

> 代码清单 7-1 DeviceController.java

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

> 这类手段的问题在于，它们搞乱了调用者代码。调用者必须在调用之后即刻检查错误。不幸的是，这个步骤很容易被遗忘。所以，遇到错误时，最好抛出一个异常。调用代码很整洁，其逻辑不会被错误处理搞乱。

Listing 7-2 shows the code after we’ve chosen to throw exceptions in methods that can detect errors.

> 代码清单 7-2 展示了在方法中遇到错误时抛出异常的情形。

Listing 7-2 DeviceController.java (with exceptions)

> 代码清单 7-2 展示了在方法中遇到错误时抛出异常的情形。

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

> 注意这段代码整洁了很多。这不仅关乎美观。这段代码更好，因为之前纠结的两个元素设备关闭算法和错误处理现在被隔离了。你可以查看其中任一元素，分别理解它。

## 7.2 WRITE YOUR TRY-CATCH-FINALLY STATEMENT FIRST 先写 Try-Catch-Finally 语句

One of the most interesting things about exceptions is that they define a scope within your program. When you execute code in the try portion of a try-catch-finally statement, you are stating that execution can abort at any point and then resume at the catch.

> 异常的妙处之一是，它们在程序中定义了一个范围。执行 try-catchfinally 语句中 try 部分的代码时，你是在表明可随时取消执行，并在 catch 语句中接续。

In a way, try blocks are like transactions. Your catch has to leave your program in a consistent state, no matter what happens in the try. For this reason it is good practice to start with a try-catch-finally statement when you are writing code that could throw exceptions. This helps you define what the user of that code should expect, no matter what goes wrong with the code that is executed in the try.

> 在某种意义上，try 代码块就像是事务。catch 代码块将程序维持在一种持续状态，无论 try 代码块中发生了什么均如此。所以，在编写可能抛出异常的代码时，最好先写出 try-catch-finally 语句。这能帮你定义代码的用户应该期待什么，无论 try 代码块中执行的代码出什么错都一样。

Let’s look at an example. We need to write some code that accesses a file and reads some serialized objects.

> 来看个例子。我们要编写访问某个文件并读出一些序列化对象的代码。

We start with a unit test that shows that we’ll get an exception when the file doesn’t exist:

> 先写一个单元测试，其中显示当文件不存在时将得到一个异常：

```java
@Test(expected = StorageException.class)
public void retrieveSectionShouldThrowOnInvalidFileName() {
  sectionStore.retrieveSection(“invalid - file”);
}
```

The test drives us to create this stub:

> 该测试驱动我们创建以下占位代码：

```java
public List<RecordedGrip> retrieveSection(String sectionName) {
  // dummy return until we have a real implementation
  return new ArrayList<RecordedGrip>();
}
```

Our test fails because it doesn’t throw an exception. Next, we change our implementation so that it attempts to access an invalid file. This operation throws an exception:

> 测试失败了，因为以上代码并未抛出异常。下一步，修改实现代码，尝试访问非法文件。该操作抛出一个异常：

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

> 这次测试通过了，因为我们捕获了异常。此时，我们可以重构了。我们可以缩小异常类型的范围，使之符合 FileInputStream 构造器真正抛出的异常，即 FileNotFoundException：

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

> 如此一来，我们就用 try-catch 结构定义了一个范围，可以继续用测试驱动（TDD）方法构建剩余的代码逻辑。这些代码逻辑将在 FileInputStream 和 close 之间添加，装作一切正常的样子。

Try to write tests that force exceptions, and then add behavior to your handler to satisfy your tests. This will cause you to build the transaction scope of the try block first and will help you maintain the transaction nature of that scope.

> 尝试编写强行抛出异常的测试，再往处理器中添加行为，使之满足测试要求。结果就是你要先构造 try 代码块的事务范围，而且也会帮助你维护好该范围的事务特征。

## 7.3 USE UNCHECKED EXCEPTIONS 使用不可控异常

The debate is over. For years Java programmers have debated over the benefits and liabilities of checked exceptions. When checked exceptions were introduced in the first version of Java, they seemed like a great idea. The signature of every method would list all of the exceptions that it could pass to its caller. Moreover, these exceptions were part of the type of the method. Your code literally wouldn’t compile if the signature didn’t match what your code could do.

> 辩论业已结束。多年来，Java 程序员们一直在争论可控异常（checked exception）的利与弊。Java 的第一个版本中引入可控异常时，看似一个极好的点子。每个方法的签名都列出它可能传递给调用者的异常。而且，这些异常就是方法类型的一部分。如果签名与代码实际所做之事不符，代码在字面上就无法编译。

At the time, we thought that checked exceptions were a great idea; and yes, they can yield some benefit. However, it is clear now that they aren’t necessary for the production of robust software. C# doesn’t have checked exceptions, and despite valiant attempts, C++ doesn’t either. Neither do Python or Ruby. Yet it is possible to write robust software in all of these languages. Because that is the case, we have to decide—really—whether checked exceptions are worth their price.

> 那时，我们认为可控异常是个绝妙的主意；而且，它也有所裨益。然而，现在已经很清楚，对于强固软件的生产，它并非必需。C#不支持可控异常。尽管做过勇敢的尝试，C++最后也不支持可控异常。Python 和 Ruby 同样如此。不过，用这些语言也有可能写出强固的软件。我们得决定——的确如此——可控异常是否值回票价。

What price? The price of checked exceptions is an Open/Closed Principle1 violation. If you throw a checked exception from a method in your code and the catch is three levels above, you must declare that exception in the signature of each method between you and the catch. This means that a change at a low level of the software can force signature changes on many higher levels. The changed modules must be rebuilt and redeployed, even though nothing they care about changed.

> 代价是什么？可控异常的代价就是违反开放/闭合原则[1]。如果你在方法中抛出可控异常，而 catch 语句在三个层级之上，你就得在 catch 语句和抛出异常处之间的每个方法签名中声明该异常。这意味着对软件中较低层级的修改，都将波及较高层级的签名。修改好的模块必须重新构建、发布，即便它们自身所关注的任何东西都没改动过。

1. [Martin].

Consider the calling hierarchy of a large system. Functions at the top call functions below them, which call more functions below them, ad infinitum. Now let’s say one of the lowest level functions is modified in such a way that it must throw an exception. If that exception is checked, then the function signature must add a throws clause. But this means that every function that calls our modified function must also be modified either to catch the new exception or to append the appropriate throws clause to its signature. Ad infinitum. The net result is a cascade of changes that work their way from the lowest levels of the software to the highest! Encapsulation is broken because all functions in the path of a throw must know about details of that low-level exception. Given that the purpose of exceptions is to allow you to handle errors at a distance, it is a shame that checked exceptions break encapsulation in this way.

> 以某个大型系统的调用层级为例。顶端函数调用它们之下的函数，逐级向下。假设某个位于最底层级的函数被修改为抛出一个异常。如果该异常是可控的，则函数签名就要添加 throw 子句。这意味着每个调用该函数的函数都要修改，捕获新异常，或在其签名中添加合适的 throw 子句。以此类推。最终得到的就是一个从软件最底端贯穿到最高端的修改链！封装被打破了，因为在抛出路径中的每个函数都要去了解下一层级的异常细节。既然异常旨在让你能在较远处处理错误，可控异常以这种方式破坏封装简直就是一种耻辱。

Checked exceptions can sometimes be useful if you are writing a critical library: You must catch them. But in general application development the dependency costs outweigh the benefits.

> 如果你在编写一套关键代码库，则可控异常有时也会有用：你必须捕获异常。但对于一般的应用开发，其依赖成本要高于收益。

## 7.4 PROVIDE CONTEXT WITH EXCEPTIONS 给出异常发生的环境说明

Each exception that you throw should provide enough context to determine the source and location of an error. In Java, you can get a stack trace from any exception; however, a stack trace can’t tell you the intent of the operation that failed.

> 你抛出的每个异常，都应当提供足够的环境说明，以便判断错误的来源和处所。在 Java 中，你可以从任何异常里得到堆栈踪迹（stack trace）；然而，堆栈踪迹却无法告诉你该失败操作的初衷。

Create informative error messages and pass them along with your exceptions. Mention the operation that failed and the type of failure. If you are logging in your application, pass along enough information to be able to log the error in your catch.

> 应创建信息充分的错误消息，并和异常一起传递出去。在消息中，包括失败的操作和失败类型。如果你的应用程序有日志系统，传递足够的信息给 catch 块，并记录下来。

## 7.5 DEFINE EXCEPTION CLASSES IN TERMS OF A CALLER’S NEEDS 依调用者需要定义异常类

There are many ways to classify errors. We can classify them by their source: Did they come from one component or another? Or their type: Are they device failures, network failures, or programming errors? However, when we define exception classes in an application, our most important concern should be how they are caught.

> 对错误分类有很多方式。可以依其来源分类：是来自组件还是其他地方？或依其类型分类：是设备错误、网络错误还是编程错误？不过，当我们在应用程序中定义异常类时，最重要的考虑应该是它们如何被捕获。

Let’s look at an example of poor exception classification. Here is a try-catch-finally statement for a third-party library call. It covers all of the exceptions that the calls can throw:

> 来看一个不太好的异常分类例子。下面的 try-catch-finally 语句是对某个第三方代码库的调用。它覆盖了该调用可能抛出的所有异常：

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

> 语句包含了一大堆重复代码，这并不出奇。在大多数异常处理中，不管真实原因如何，我们总是做相对标准的处理。我们得记录错误，确保能继续工作。

In this case, because we know that the work that we are doing is roughly the same regardless of the exception, we can simplify our code considerably by wrapping the API that we are calling and making sure that it returns a common exception type:

> 在本例中，既然知道我们所做的事不外如此，就可以通过打包调用 API、确保它返回通用异常类型，从而简化代码。

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

> 在本例中，既然知道我们所做的事不外如此，就可以通过打包调用 API、确保它返回通用异常类型，从而简化代码。

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

> 类似我们为 ACMEPort 定义的这种打包类非常有用。实际上，将第三方 API 打包是个良好的实践手段。当你打包一个第三方 API，你就降低了对它的依赖：未来你可以不太痛苦地改用其他代码库。在你测试自己的代码时，打包也有助于模拟第三方调用。

One final advantage of wrapping is that you aren’t tied to a particular vendor’s API design choices. You can define an API that you feel comfortable with. In the preceding example, we defined a single exception type for port device failure and found that we could write much cleaner code.

> 打包的好处还在于你不必绑死在某个特定厂商的 API 设计上。你可以定义自己感觉舒服的 API。在上例中，我们为 port 设备错误定义了一个异常类型，然后发现这样能写出更整洁的代码。

Often a single exception class is fine for a particular area of code. The information sent with the exception can distinguish the errors. Use different classes only if there are times when you want to catch one exception and allow the other one to pass through.

> 对于代码的某个特定区域，单一异常类通常可行。伴随异常发送出来的信息能够区分不同错误。如果你想要捕获某个异常，并且放过其他异常，就使用不同的异常类。

## 7.6 DEFINE THE NORMAL FLOW 定义常规流程

If you follow the advice in the preceding sections, you’ll end up with a good amount of separation between your business logic and your error handling. The bulk of your code will start to look like a clean unadorned algorithm. However, the process of doing this pushes error detection to the edges of your program. You wrap external APIs so that you can throw your own exceptions, and you define a handler above your code so that you can deal with any aborted computation. Most of the time this is a great approach, but there are some times when you may not want to abort.

> 如果你遵循前文提及的建议，在业务逻辑和错误处理代码之间就会有良好的区隔。大量代码会开始变得像是整洁而简朴的算法。然而，这样做却把错误检测推到了程序的边缘地带。你打包了外部 API 以抛出自己的异常，你在代码的顶端定义了一个处理器来应付任何失败了的运算。在大多数时候，这种手段很棒，不过有时你也许不愿这么做。

![](figures/ch7/103fig02.jpg)

Let’s take a look at an example. Here is some awkward code that sums expenses in a billing application:

> 来看一个例子。下面的笨代码来自某个记账应用的开支总计模块：

```java
try {
  MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
  m_total += expenses.getTotal();
} catch(MealExpensesNotFound e) {
  m_total += getMealPerDiem();
}
```

In this business, if meals are expensed, they become part of the total. If they aren’t, the employee gets a meal per diem amount for that day. The exception clutters the logic. Wouldn’t it be better if we didn’t have to deal with the special case? If we didn’t, our code would look much simpler. It would look like this:

> 业务逻辑是，如果消耗了餐食，则计入总额中。如果没有消耗，则员工得到当日餐食补贴。异常打断了业务逻辑。如果不去处理特殊情况会不会好一些？那样的话代码看起来会更简洁。就像这样：

```java
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();
```

Can we make the code that simple? It turns out that we can. We can change the ExpenseReportDAO so that it always returns a MealExpense object. If there are no meal expenses, it returns a MealExpense object that returns the per diem as its total:

> 其总是返回 MealExpense 对象。如果没有餐食消耗，就返回一个返回餐食补贴的 MealExpense 对象。

```java
public class PerDiemMealExpenses implements MealExpenses {
  public int getTotal() {
    // return the per diem default
  }
}
```

This is called the SPECIAL CASE PATTERN [Fowler]. You create a class or configure an object so that it handles a special case for you. When you do, the client code doesn’t have to deal with exceptional behavior. That behavior is encapsulated in the special case object.

> 这种手法叫做特例模式（SPECIAL CASE PATTERN，[Fowler]）。创建一个类或配置一个对象，用来处理特例。你来处理特例，客户代码就不用应付异常行为了。异常行为被封装到特例对象中。

## 7.7 DON’T RETURN NULL 别返回 null 值

I think that any discussion about error handling should include mention of the things we do that invite errors. The first on the list is returning null. I can’t begin to count the number of applications I’ve seen in which nearly every other line was a check for null. Here is some example code:

> 我认为，要讨论错误处理，就一定要提及那些容易引发错误的做法。第一项就是返回 null 值。我不想去计算曾经见过多少几乎每行代码都在检查 null 值的应用程序。下面就是个例子：

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

> 这种代码看似不坏，其实糟透了！返回 null 值，基本上是在给自己增加工作量，也是在给调用者添乱。只要有一处没检查 null 值，应用程序就会失控。

Did you notice the fact that there wasn’t a null check in the second line of that nested if statement? What would have happened at runtime if persistentStore were null? We would have had a NullPointerException at runtime, and either someone is catching NullPointerException at the top level or they are not. Either way it’s bad. What exactly should you do in response to a NullPointerException thrown from the depths of your application?

> 你有没有注意到，嵌套 if 语句的第二行没有检查 null 值？如果在运行时 persistentStore 为 null 会发生什么事？我们会在运行时得到一个 NullPointerException 异常，也许有人在代码顶端捕获这个异常，也可能没有捕获。两种情况都很糟糕。对于从应用程序深处抛出的 NullPointerException 异常，你到底该作何反应呢？

It’s easy to say that the problem with the code above is that it is missing a null check, but in actuality, the problem is that it has too many. If you are tempted to return null from a method, consider throwing an exception or returning a SPECIAL CASE object instead. If you are calling a null-returning method from a third-party API, consider wrapping that method with a method that either throws an exception or returns a special case object.

> 可以敷衍说上列代码的问题是少做了一次 null 值检查，其实问题多多。如果你打算在方法中返回 null 值，不如抛出异常，或是返回特例对象。如果你在调用某个第三方 API 中可能返回 null 值的方法，可以考虑用新方法打包这个方法，在新方法中抛出异常或返回特例对象。

In many cases, special case objects are an easy remedy. Imagine that you have code like this:

> 在许多情况下，特例对象都是爽口良药。设想有这么一段代码：

```java
List<Employee> employees = getEmployees();
if (employees != null) {
  for(Employee e : employees) {
    totalPay += e.getPay();
  }
}
```

Right now, getEmployees can return null, but does it have to? If we change getEmployee so that it returns an empty list, we can clean up the code:

> 现在，getExployees 可能返回 null，但是否一定要这么做呢？如果修改 getEmployee，返回空列表，就能使代码整洁起来：

```java
List<Employee> employees = getEmployees();
for(Employee e : employees) {
  totalPay += e.getPay();
}
```

Fortunately, Java has Collections.emptyList(), and it returns a predefined immutable list that we can use for this purpose:

> 所幸 Java 有 Collections.emptyList( )方法，该方法返回一个预定义不可变列表，可用于这种目的：

```java
public List<Employee> getEmployees() {
  if( .. there are no employees .. )
    return Collections.emptyList();
}
```

If you code this way, you will minimize the chance of NullPointerExceptions and your code will be cleaner.

> 这样编码，就能尽量避免 NullPointerException 的出现，代码也就更整洁了。

## 7.8 DON’T PASS NULL 别传递 null 值

Returning null from methods is bad, but passing null into methods is worse. Unless you are working with an API which expects you to pass null, you should avoid passing null in your code whenever possible.

> 在方法中返回 null 值是糟糕的做法，但将 null 值传递给其他方法就更糟糕了。除非 API 要求你向它传递 null 值，否则就要尽可能避免传递 null 值。

Let’s look at an example to see why. Here is a simple method which calculates a metric for two points:

> 举例说明原因。用下面这个简单的方法计算两点的投射：

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

> 如果有人传入 null 值会怎样？

```java
calculator.xProjection(null, new Point(12, 13));
```

We’ll get a NullPointerException, of course.

> 当然，我们会得到一个 NullPointerException 异常。

How can we fix it? We could create a new exception type and throw it:

> 如何修正？可以创建一个新异常类型并抛出：

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

> 这样做好些吗？可能比 null 指针异常好一些，但要记住，我们还得为 InvalidArgumentException 异常定义处理器。这个处理器该做什么？还有更好的做法吗？

There is another alternative. We could use a set of assertions:

> 还有替代方案。可以使用一组断言

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

> 看上去很美，但仍未解决问题。如果有人传入 null 值，还是会得到运行时错误。

In most programming languages there is no good way to deal with a null that is passed by a caller accidentally. Because this is the case, the rational approach is to forbid passing null by default. When you do, you can code with the knowledge that a null in an argument list is an indication of a problem, and end up with far fewer careless mistakes.

> 在大多数编程语言中，没有良好的方法能对付由调用者意外传入的 null 值。事已如此，恰当的做法就是禁止传入 null 值。这样，你在编码的时候，就会时时记住参数列表中的 null 值意味着出问题了，从而大量避免这种无心之失。

## 7.9 CONCLUSION 小结

Clean code is readable, but it must also be robust. These are not conflicting goals. We can write robust clean code if we see error handling as a separate concern, something that is viewable independently of our main logic. To the degree that we are able to do that, we can reason about it independently, and we can make great strides in the maintainability of our code.

> 整洁代码是可读的，但也要强固。可读与强固并不冲突。如果将错误处理隔离看待，独立于主要逻辑之外，就能写出强固而整洁的代码。做到这一步，我们就能单独处理它，也极大地提升了代码的可维护性。
