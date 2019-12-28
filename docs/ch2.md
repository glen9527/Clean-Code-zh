Meaningful Names
by Tim Ottinger
Image

INTRODUCTION
Names are everywhere in software. We name our variables, our functions, our arguments, classes, and packages. We name our source files and the directories that contain them. We name our jar files and war files and ear files. We name and name and name. Because we do so much of it, we’d better do it well. What follows are some simple rules for creating good names.

USE INTENTION-REVEALING NAMES
It is easy to say that names should reveal intent. What we want to impress upon you is that we are serious about this. Choosing good names takes time but saves more than it takes. So take care with your names and change them when you find better ones. Everyone who reads your code (including you) will be happier if you do.

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

   int d; // elapsed time in days

The name d reveals nothing. It does not evoke a sense of elapsed time, nor of days. We should choose a name that specifies what is being measured and the unit of that measurement:

   int elapsedTimeInDays;
   int daysSinceCreation;
   int daysSinceModification;
   int fileAgeInDays;

Choosing names that reveal intent can make it much easier to understand and change code. What is the purpose of this code?

   public List<int[]> getThem() {
     List<int[]> list1 = new ArrayList<int[]>();
     for (int[] x : theList)
       if (x[0] == 4)
         list1.add(x);
     return list1;
   }

Why is it hard to tell what this code is doing? There are no complex expressions. Spacing and indentation are reasonable. There are only three variables and two constants mentioned. There aren’t even any fancy classes or polymorphic methods, just a list of arrays (or so it seems).

The problem isn’t the simplicity of the code but the implicity of the code (to coin a phrase): the degree to which the context is not explicit in the code itself. The code implicitly requires that we know the answers to questions such as:

1. What kinds of things are in theList?

2. What is the significance of the zeroth subscript of an item in theList?

3. What is the significance of the value 4?

4. How would I use the list being returned?

The answers to these questions are not present in the code sample, but they could have been. Say that we’re working in a mine sweeper game. We find that the board is a list of cells called theList. Let’s rename that to gameBoard.

Each cell on the board is represented by a simple array. We further find that the zeroth subscript is the location of a status value and that a status value of 4 means “flagged.” Just by giving these concepts names we can improve the code considerably:

   public List<int[]> getFlaggedCells() {
     List<int[]> flaggedCells = new ArrayList<int[]>();
     for (int[] cell : gameBoard)
      if (cell[STATUS_VALUE] == FLAGGED)
        flaggedCells.add(cell);
      return flaggedCells;
   }

Notice that the simplicity of the code has not changed. It still has exactly the same number of operators and constants, with exactly the same number of nesting levels. But the code has become much more explicit.

We can go further and write a simple class for cells instead of using an array of ints. It can include an intention-revealing function (call it isFlagged) to hide the magic numbers. It results in a new version of the function:

   public List<Cell> getFlaggedCells() {
     List<Cell> flaggedCells = new ArrayList<Cell>();
     for (Cell cell : gameBoard)
       if (cell.isFlagged())
         flaggedCells.add(cell);
     return flaggedCells;
   }

With these simple name changes, it’s not difficult to understand what’s going on. This is the power of choosing good names.

AVOID DISINFORMATION
Programmers must avoid leaving false clues that obscure the meaning of code. We should avoid words whose entrenched meanings vary from our intended meaning. For example, hp, aix, and sco would be poor variable names because they are the names of Unix platforms or variants. Even if you are coding a hypotenuse and hp looks like a good abbreviation, it could be disinformative.

Do not refer to a grouping of accounts as an accountList unless it’s actually a List. The word list means something specific to programmers. If the container holding the accounts is not actually a List, it may lead to false conclusions.1 So accountGroup or bunchOfAccounts or just plain accounts would be better.

1. As we’ll see later on, even if the container is a List, it’s probably better not to encode the container type into the name.

Beware of using names which vary in small ways. How long does it take to spot the subtle difference between a XYZControllerForEfficientHandlingOfStrings in one module and, somewhere a little more distant, XYZControllerForEfficientStorageOfStrings? The words have frightfully similar shapes.

Spelling similar concepts similarly is information. Using inconsistent spellings is disinformation. With modern Java environments we enjoy automatic code completion. We write a few characters of a name and press some hotkey combination (if that) and are rewarded with a list of possible completions for that name. It is very helpful if names for very similar things sort together alphabetically and if the differences are very obvious, because the developer is likely to pick an object by name without seeing your copious comments or even the list of methods supplied by that class.

A truly awful example of disinformative names would be the use of lower-case L or uppercase O as variable names, especially in combination. The problem, of course, is that they look almost entirely like the constants one and zero, respectively.

   int a = l;
   if ( O == l )
     a = O1;
   else
     l = 01;

The reader may think this a contrivance, but we have examined code where such things were abundant. In one case the author of the code suggested using a different font so that the differences were more obvious, a solution that would have to be passed down to all future developers as oral tradition or in a written document. The problem is conquered with finality and without creating new work products by a simple renaming.

MAKE MEANINGFUL DISTINCTIONS
Image

Programmers create problems for themselves when they write code solely to satisfy a compiler or interpreter. For example, because you can’t use the same name to refer to two different things in the same scope, you might be tempted to change one name in an arbitrary way. Sometimes this is done by misspelling one, leading to the surprising situation where correcting spelling errors leads to an inability to compile.2

2. Consider, for example, the truly hideous practice of creating a variable named klass just because the name class was used for something else.

It is not sufficient to add number series or noise words, even though the compiler is satisfied. If names must be different, then they should also mean something different.

Number-series naming (a1, a2, .. aN) is the opposite of intentional naming. Such names are not disinformative—they are noninformative; they provide no clue to the author’s intention. Consider:

   public static void copyChars(char a1[], char a2[]) {
     for (int i = 0; i < a1.length; i++) {
       a2[i] = a1[i];
     }
   }

This function reads much better when source and destination are used for the argument names.

Noise words are another meaningless distinction. Imagine that you have a Product class. If you have another called ProductInfo or ProductData, you have made the names different without making them mean anything different. Info and Data are indistinct noise words like a, an, and the.

Note that there is nothing wrong with using prefix conventions like a and the so long as they make a meaningful distinction. For example you might use a for all local variables and the for all function arguments.3 The problem comes in when you decide to call a variable theZork because you already have another variable named zork.

3. Uncle Bob used to do this in C++ but has given up the practice because modern IDEs make it unnecessary.

Noise words are redundant. The word variable should never appear in a variable name. The word table should never appear in a table name. How is NameString better than Name? Would a Name ever be a floating point number? If so, it breaks an earlier rule about disinformation. Imagine finding one class named Customer and another named CustomerObject. What should you understand as the distinction? Which one will represent the best path to a customer’s payment history?

There is an application we know of where this is illustrated. we’ve changed the names to protect the guilty, but here’s the exact form of the error:

   getActiveAccount();
   getActiveAccounts();
   getActiveAccountInfo();

How are the programmers in this project supposed to know which of these functions to call?

In the absence of specific conventions, the variable moneyAmount is indistinguishable from money, customerInfo is indistinguishable from customer, accountData is indistinguishable from account, and theMessage is indistinguishable from message. Distinguish names in such a way that the reader knows what the differences offer.

USE PRONOUNCEABLE NAMES
Humans are good at words. A significant part of our brains is dedicated to the concept of words. And words are, by definition, pronounceable. It would be a shame not to take advantage of that huge portion of our brains that has evolved to deal with spoken language. So make your names pronounceable.

If you can’t pronounce it, you can’t discuss it without sounding like an idiot. “Well, over here on the bee cee arr three cee enn tee we have a pee ess zee kyew int, see?” This matters because programming is a social activity.

A company I know has genymdhms (generation date, year, month, day, hour, minute, and second) so they walked around saying “gen why emm dee aich emm ess”. I have an annoying habit of pronouncing everything as written, so I started saying “gen-yah-muddahims.” It later was being called this by a host of designers and analysts, and we still sounded silly. But we were in on the joke, so it was fun. Fun or not, we were tolerating poor naming. New developers had to have the variables explained to them, and then they spoke about it in silly made-up words instead of using proper English terms. Compare

   class DtaRcrd102 {
     private Date genymdhms;
     private Date modymdhms;
     private final String pszqint = ”102”;
      /* … */
   };

to

   class Customer {
     private Date generationTimestamp;
     private Date modificationTimestamp;;
     private final String recordId = ”102”;
     /* … */
   };

Intelligent conversation is now possible: “Hey, Mikey, take a look at this record! The generation timestamp is set to tomorrow’s date! How can that be?”

USE SEARCHABLE NAMES
Single-letter names and numeric constants have a particular problem in that they are not easy to locate across a body of text.

One might easily grep for MAX_CLASSES_PER_STUDENT, but the number 7 could be more troublesome. Searches may turn up the digit as part of file names, other constant definitions, and in various expressions where the value is used with different intent. It is even worse when a constant is a long number and someone might have transposed digits, thereby creating a bug while simultaneously evading the programmer’s search.

Likewise, the name e is a poor choice for any variable for which a programmer might need to search. It is the most common letter in the English language and likely to show up in every passage of text in every program. In this regard, longer names trump shorter names, and any searchable name trumps a constant in code.

My personal preference is that single-letter names can ONLY be used as local variables inside short methods. The length of a name should correspond to the size of its scope [N5]. If a variable or constant might be seen or used in multiple places in a body of code, it is imperative to give it a search-friendly name. Once again compare

   for (int j=0; j<34; j++) {
     s += (t[j]*4)/5;
   }

to

   int realDaysPerIdealDay = 4;
   const int WORK_DAYS_PER_WEEK = 5;
   int sum = 0;
   for (int j=0; j < NUMBER_OF_TASKS; j++) {
     int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
     int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
     sum += realTaskWeeks;
   }

Note that sum, above, is not a particularly useful name but at least is searchable. The intentionally named code makes for a longer function, but consider how much easier it will be to find WORK_DAYS_PER_WEEK than to find all the places where 5 was used and filter the list down to just the instances with the intended meaning.

AVOID ENCODINGS
We have enough encodings to deal with without adding more to our burden. Encoding type or scope information into names simply adds an extra burden of deciphering. It hardly seems reasonable to require each new employee to learn yet another encoding “language” in addition to learning the (usually considerable) body of code that they’ll be working in. It is an unnecessary mental burden when trying to solve a problem. Encoded names are seldom pronounceable and are easy to mis-type.

Hungarian Notation
In days of old, when we worked in name-length-challenged languages, we violated this rule out of necessity, and with regret. Fortran forced encodings by making the first letter a code for the type. Early versions of BASIC allowed only a letter plus one digit. Hungarian Notation (HN) took this to a whole new level.

HN was considered to be pretty important back in the Windows C API, when everything was an integer handle or a long pointer or a void pointer, or one of several implementations of “string” (with different uses and attributes). The compiler did not check types in those days, so the programmers needed a crutch to help them remember the types.

In modern languages we have much richer type systems, and the compilers remember and enforce the types. What’s more, there is a trend toward smaller classes and shorter functions so that people can usually see the point of declaration of each variable they’re using.

Java programmers don’t need type encoding. Objects are strongly typed, and editing environments have advanced such that they detect a type error long before you can run a compile! So nowadays HN and other forms of type encoding are simply impediments. They make it harder to change the name or type of a variable, function, or class. They make it harder to read the code. And they create the possibility that the encoding system will mislead the reader.

   PhoneNumber phoneString;
   // name not changed when type changed!

Member Prefixes
You also don’t need to prefix member variables with m_ anymore. Your classes and functions should be small enough that you don’t need them. And you should be using an editing environment that highlights or colorizes members to make them distinct.

   public class Part {
     private String m_dsc; // The textual description
     void setName(String name) {
       m_dsc = name;
     }
   }
   _________________________________________________
   public class Part {
     String description;
     void setDescription(String description) {
       this.description = description;
     }
   }

Besides, people quickly learn to ignore the prefix (or suffix) to see the meaningful part of the name. The more we read the code, the less we see the prefixes. Eventually the prefixes become unseen clutter and a marker of older code.

Interfaces and Implementations
These are sometimes a special case for encodings. For example, say you are building an ABSTRACT FACTORY for the creation of shapes. This factory will be an interface and will be implemented by a concrete class. What should you name them? IShapeFactory and ShapeFactory? I prefer to leave interfaces unadorned. The preceding I, so common in today’s legacy wads, is a distraction at best and too much information at worst. I don’t want my users knowing that I’m handing them an interface. I just want them to know that it’s a ShapeFactory. So if I must encode either the interface or the implementation, I choose the implementation. Calling it ShapeFactoryImp, or even the hideous CShapeFactory, is preferable to encoding the interface.

AVOID MENTAL MAPPING
Readers shouldn’t have to mentally translate your names into other names they already know. This problem generally arises from a choice to use neither problem domain terms nor solution domain terms.

This is a problem with single-letter variable names. Certainly a loop counter may be named i or j or k (though never l!) if its scope is very small and no other names can conflict with it. This is because those single-letter names for loop counters are traditional. However, in most other contexts a single-letter name is a poor choice; it’s just a place holder that the reader must mentally map to the actual concept. There can be no worse reason for using the name c than because a and b were already taken.

In general programmers are pretty smart people. Smart people sometimes like to show off their smarts by demonstrating their mental juggling abilities. After all, if you can reliably remember that r is the lower-cased version of the url with the host and scheme removed, then you must clearly be very smart.

One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand.

CLASS NAMES
Classes and objects should have noun or noun phrase names like Customer, WikiPage, Account, and AddressParser. Avoid words like Manager, Processor, Data, or Info in the name of a class. A class name should not be a verb.

METHOD NAMES
Methods should have verb or verb phrase names like postPayment, deletePage, or save. Accessors, mutators, and predicates should be named for their value and prefixed with get, set, and is according to the javabean standard.4

4. http://java.sun.com/products/javabeans/docs/spec.html

   string name = employee.getName();
   customer.setName(”mike”);
   if (paycheck.isPosted())…

When constructors are overloaded, use static factory methods with names that describe the arguments. For example,

   Complex fulcrumPoint = Complex.FromRealNumber(23.0);

is generally better than

   Complex fulcrumPoint = new Complex(23.0);

Consider enforcing their use by making the corresponding constructors private.

DON’T BE CUTE
If names are too clever, they will be memorable only to people who share the author’s sense of humor, and only as long as these people remember the joke. Will they know what the function named HolyHandGrenade is supposed to do? Sure, it’s cute, but maybe in this case DeleteItems might be a better name. Choose clarity over entertainment value.

Image

Cuteness in code often appears in the form of colloquialisms or slang. For example, don’t use the name whack() to mean kill(). Don’t tell little culture-dependent jokes like eatMyShorts() to mean abort().

Say what you mean. Mean what you say.

PICK ONE WORD PER CONCEPT
Pick one word for one abstract concept and stick with it. For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes. How do you remember which method name goes with which class? Sadly, you often have to remember which company, group, or individual wrote the library or class in order to remember which term was used. Otherwise, you spend an awful lot of time browsing through headers and previous code samples.

Modern editing environments like Eclipse and IntelliJ provide context-sensitive clues, such as the list of methods you can call on a given object. But note that the list doesn’t usually give you the comments you wrote around your function names and parameter lists. You are lucky if it gives the parameter names from function declarations. The function names have to stand alone, and they have to be consistent in order for you to pick the correct method without any additional exploration.

Likewise, it’s confusing to have a controller and a manager and a driver in the same code base. What is the essential difference between a DeviceManager and a Protocol-Controller? Why are both not controllers or both not managers? Are they both Drivers really? The name leads you to expect two objects that have very different type as well as having different classes.

A consistent lexicon is a great boon to the programmers who must use your code.

DON’T PUN
Avoid using the same word for two purposes. Using the same term for two different ideas is essentially a pun.

If you follow the “one word per concept” rule, you could end up with many classes that have, for example, an add method. As long as the parameter lists and return values of the various add methods are semantically equivalent, all is well.

However one might decide to use the word add for “consistency” when he or she is not in fact adding in the same sense. Let’s say we have many classes where add will create a new value by adding or concatenating two existing values. Now let’s say we are writing a new class that has a method that puts its single parameter into a collection. Should we call this method add? It might seem consistent because we have so many other add methods, but in this case, the semantics are different, so we should use a name like insert or append instead. To call the new method add would be a pun.

Our goal, as authors, is to make our code as easy as possible to understand. We want our code to be a quick skim, not an intense study. We want to use the popular paperback model whereby the author is responsible for making himself clear and not the academic model where it is the scholar’s job to dig the meaning out of the paper.

USE SOLUTION DOMAIN NAMES
Remember that the people who read your code will be programmers. So go ahead and use computer science (CS) terms, algorithm names, pattern names, math terms, and so forth. It is not wise to draw every name from the problem domain because we don’t want our coworkers to have to run back and forth to the customer asking what every name means when they already know the concept by a different name.

The name AccountVisitor means a great deal to a programmer who is familiar with the VISITOR pattern. What programmer would not know what a JobQueue was? There are lots of very technical things that programmers have to do. Choosing technical names for those things is usually the most appropriate course.

USE PROBLEM DOMAIN NAMES
When there is no “programmer-eese” for what you’re doing, use the name from the problem domain. At least the programmer who maintains your code can ask a domain expert what it means.

Separating solution and problem domain concepts is part of the job of a good programmer and designer. The code that has more to do with problem domain concepts should have names drawn from the problem domain.

ADD MEANINGFUL CONTEXT
There are a few names which are meaningful in and of themselves—most are not. Instead, you need to place names in context for your reader by enclosing them in well-named classes, functions, or namespaces. When all else fails, then prefixing the name may be necessary as a last resort.

Imagine that you have variables named firstName, lastName, street, houseNumber, city, state, and zipcode. Taken together it’s pretty clear that they form an address. But what if you just saw the state variable being used alone in a method? Would you automatically infer that it was part of an address?

You can add context by using prefixes: addrFirstName, addrLastName, addrState, and so on. At least readers will understand that these variables are part of a larger structure. Of course, a better solution is to create a class named Address. Then, even the compiler knows that the variables belong to a bigger concept.

Consider the method in Listing 2-1. Do the variables need a more meaningful context? The function name provides only part of the context; the algorithm provides the rest. Once you read through the function, you see that the three variables, number, verb, and pluralModifier, are part of the “guess statistics” message. Unfortunately, the context must be inferred. When you first look at the method, the meanings of the variables are opaque.


Listing 2-1 Variables with unclear context.

   private void printGuessStatistics(char candidate, int count) {   String number;
       String verb;
       String pluralModifier;
       if (count == 0) {
         number = ”no”;
         verb = ”are”;
         pluralModifier = ”s”;
       } else if (count == 1) {
         number = ”1”;
         verb = ”is”;
         pluralModifier = ””;
       } else {
         number = Integer.toString(count);
         verb = ”are”;
         pluralModifier = ”s”;
       }
       String guessMessage = String.format(
         ”There %s %s %s%s”, verb, number, candidate, pluralModifier
       );
       print(guessMessage);
     }

The function is a bit too long and the variables are used throughout. To split the function into smaller pieces we need to create a GuessStatisticsMessage class and make the three variables fields of this class. This provides a clear context for the three variables. They are definitively part of the GuessStatisticsMessage. The improvement of context also allows the algorithm to be made much cleaner by breaking it into many smaller functions. (See Listing 2-2.)


Listing 2-2 Variables have a context.

   public class GuessStatisticsMessage {
     private String number;
     private String verb;
     private String pluralModifier;
   
     public String make(char candidate, int count) {
       createPluralDependentMessageParts(count);
        return String.format(
          "There %s %s %s%s", 
          verb, number, candidate, pluralModifier );
     }
   
     private void createPluralDependentMessageParts(int count) {
       if (count == 0) {
         thereAreNoLetters();
       } else if (count == 1) {
         thereIsOneLetter();
       } else {
         thereAreManyLetters(count);
       }
     }
   
     private void thereAreManyLetters(int count) {
       number = Integer.toString(count);
       verb = "are";
       pluralModifier = "s";
     }
   
     private void thereIsOneLetter() {
       number = "1";
       verb = "is";
       pluralModifier = "";
     }
   
     private void thereAreNoLetters() {
       number = "no";
       verb = "are";
       pluralModifier = "s";
     }
   }

DON’T ADD GRATUITOUS CONTEXT
In an imaginary application called “Gas Station Deluxe,” it is a bad idea to prefix every class with GSD. Frankly, you are working against your tools. You type G and press the completion key and are rewarded with a mile-long list of every class in the system. Is that wise? Why make it hard for the IDE to help you?

Likewise, say you invented a MailingAddress class in GSD’s accounting module, and you named it GSDAccountAddress. Later, you need a mailing address for your customer contact application. Do you use GSDAccountAddress? Does it sound like the right name? Ten of 17 characters are redundant or irrelevant.

Shorter names are generally better than longer ones, so long as they are clear. Add no more context to a name than is necessary.

The names accountAddress and customerAddress are fine names for instances of the class Address but could be poor names for classes. Address is a fine name for a class. If I need to differentiate between MAC addresses, port addresses, and Web addresses, I might consider PostalAddress, MAC, and URI. The resulting names are more precise, which is the point of all naming.

FINAL WORDS
The hardest thing about choosing good names is that it requires good descriptive skills and a shared cultural background. This is a teaching issue rather than a technical, business, or management issue. As a result many people in this field don’t learn to do it very well.

People are also afraid of renaming things for fear that some other developers will object. We do not share that fear and find that we are actually grateful when names change (for the better). Most of the time we don’t really memorize the names of classes and methods. We use the modern tools to deal with details like that so we can focus on whether the code reads like paragraphs and sentences, or at least like tables and data structure (a sentence isn’t always the best way to display data). You will probably end up surprising someone when you rename, just like you might with any other code improvement. Don’t let it stop you in your tracks.

Follow some of these rules and see whether you don’t improve the readability of your code. If you are maintaining someone else’s code, use refactoring tools to help resolve these problems. It will pay off in the short term and continue to pay in the long run.