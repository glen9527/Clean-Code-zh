# 第 6 章 Objects and Data Structures 对象和数据结构

![](figures/ch6/6_1fig_martin.jpg)

There is a reason that we keep our variables private. We don’t want anyone else to depend on them. We want to keep the freedom to change their type or implementation on a whim or an impulse. Why, then, do so many programmers automatically add getters and setters to their objects, exposing their private variables as if they were public?

> 将变量设置为私有（private）有一个理由：我们不想其他人依赖这些变量。我们还想在心血来潮时能自由修改其类型或实现。那么，为什么还是有那么多程序员给对象自动添加赋值器和取值器，将私有变量公之于众、如同它们根本就是公共变量一般呢？

## 6.1 DATA ABSTRACTION 数据抽象

Consider the difference between Listing 6-1 and Listing 6-2. Both represent the data of a point on the Cartesian plane. And yet one exposes its implementation and the other completely hides it.

> 看看代码清单 6-1 和代码清单 6-2 之间的区别。每段代码都表示笛卡儿平面上的一个点。不过，其中之一曝露了其实现，而另一个则完全隐藏了其实现。

Listing 6-1 Concrete Point

> 代码清单 6-1 具象点

```java
public class Point {
  public double x;
  public double y;
}
```

Listing 6-2 Abstract Point

> 代码清单 6-2 抽象点

```java
public interface Point {
  double getX();
  double getY();
  void setCartesian(double x, double y);
  double getR();
  double getTheta();
  void setPolar(double r, double theta);
}
```

The beautiful thing about Listing 6-2 is that there is no way you can tell whether the implementation is in rectangular or polar coordinates. It might be neither! And yet the interface still unmistakably represents a data structure.

> 代码清单 6-2 的漂亮之处在于，你不知道该实现会是在矩形坐标系中还是在极坐标系中。可能两个都不是！然而，该接口还是明白无误地呈现了一种数据结构。

But it represents more than just a data structure. The methods enforce an access policy. You can read the individual coordinates independently, but you must set the coordinates together as an atomic operation.

> 不过它呈现的还不止是一个数据结构。那些方法固定了一套存取策略。你可以单独读取某个坐标，但必须通过一次原子操作设定所有坐标。

Listing 6-1, on the other hand, is very clearly implemented in rectangular coordinates, and it forces us to manipulate those coordinates independently. This exposes implementation. Indeed, it would expose implementation even if the variables were private and we were using single variable getters and setters.

> 而代码清单 6-1 则非常清楚地是在矩形坐标系中实现，并要求我们单个操作那些坐标。这就曝露了实现。实际上，即便变量都是私有，而且我们也通过变量取值器和赋值器使用变量，其实现仍然曝露了。

Hiding implementation is not just a matter of putting a layer of functions between the variables. Hiding implementation is about abstractions! A class does not simply push its variables out through getters and setters. Rather it exposes abstract interfaces that allow its users to manipulate the essence of the data, without having to know its implementation.

> 隐藏实现并非只是在变量之间放上一个函数层那么简单。隐藏实现关乎抽象！类并不简单地用取值器和赋值器将其变量推向外间，而是曝露抽象接口，以便用户无需了解数据的实现就能操作数据本体。

Consider Listing 6-3 and Listing 6-4. The first uses concrete terms to communicate the fuel level of a vehicle, whereas the second does so with the abstraction of percentage. In the concrete case you can be pretty sure that these are just accessors of variables. In the abstract case you have no clue at all about the form of the data.

> 看看代码清单 6-3 和代码清单 6-4。前者使用具象手段与机动车的燃料层通信，而后者则采用百分比抽象。你能确定前者里面都是些变量存取器，而却无法得知后者中的数据形态。

Listing 6-3 Concrete Vehicle

> 代码清单 6-3 具象机动车

```java
public interface Vehicle {
  double getFuelTankCapacityInGallons();
  double getGallonsOfGasoline();
}
```

Listing 6-4 Abstract Vehicle

> 代码清单 6-4 抽象机动车

```java
public interface Vehicle {
  double getPercentFuelRemaining();
}
```

In both of the above cases the second option is preferable. We do not want to expose the details of our data. Rather we want to express our data in abstract terms. This is not merely accomplished by using interfaces and/or getters and setters. Serious thought needs to be put into the best way to represent the data that an object contains. The worst option is to blithely add getters and setters.

> 以上两段代码以后者为佳。我们不愿曝露数据细节，更愿意以抽象形态表述数据。这并不只是用接口和/或赋值器、取值器就万事大吉。要以最好的方式呈现某个对象包含的数据，需要做严肃的思考。傻乐着乱加取值器和赋值器，是最坏的选择。

## 6.2 DATA/OBJECT ANTI-SYMMETRY 数据、对象的反对称性

These two examples show the difference between objects and data structures. Objects hide their data behind abstractions and expose functions that operate on that data. Data structure expose their data and have no meaningful functions. Go back and read that again. Notice the complimentary nature of the two definitions. They are virtual opposites. This difference may seem trivial, but it has far-reaching implications.

> 这两个例子展示了对象与数据结构之间的差异。对象把数据隐藏于抽象之后，曝露操作数据的函数。数据结构曝露其数据，没有提供有意义的函数。回过头再读一遍。留意这两种定义的本质。它们是对立的。这种差异貌似微小，但却有深远的含义。

Consider, for example, the procedural shape example in Listing 6-5. The Geometry class operates on the three shape classes. The shape classes are simple data structures without any behavior. All the behavior is in the Geometry class.

> 例如，代码清单 6-5 中的过程式代码形状范例。Geometry 类操作三个形状类。形状类都是简单的数据结构，没有任何行为。所有行为都在 Geometry 类中。

Listing 6-5 Procedural Shape

> 代码清单 6-5 过程式形状代码

```java
public class Square {
  public Point topLeft;
  public double side;
}

public class Rectangle {
  public Point topLeft;
  public double height;
  public double width;
}

public class Circle {
  public Point center;
  public double radius;
}

public class Geometry {
  public final double PI = 3.141592653589793;

  public double area(Object shape) throws NoSuchShapeException
  {
    if (shape instanceof Square) {
      Square s = (Square)shape;
      return s.side * s.side;
    }

    else if (shape instanceof Rectangle) {
      Rectangle r = (Rectangle)shape;
      return r.height * r.width;
    }
    else if (shape instanceof Circle) {
      Circle c = (Circle)shape;
      return PI * c.radius * c.radius;
    }
    throw new NoSuchShapeException();
  }
}
```

Object-oriented programmers might wrinkle their noses at this and complain that it is procedural—and they’d be right. But the sneer may not be warranted. Consider what would happen if a perimeter() function were added to Geometry. The shape classes would be unaffected! Any other classes that depended upon the shapes would also be unaffected! On the other hand, if I add a new shape, I must change all the functions in Geometry to deal with it. Again, read that over. Notice that the two conditions are diametrically opposed.

> 面向对象程序员可能会对此嗤之以鼻，抱怨说这是过程式代码——他们大概是对的，不过这种嘲笑并不完全正确。想想看，如果给 Geometry 类添加一个 primeter() 函数会怎样。那些形状类根本不会因此而受影响！另一方面，如果添加一个新形状，就得修改 Geometry 中的所有函数来处理它。再读一遍代码。注意，这两种情形也是直接对立的。

Now consider the object-oriented solution in Listing 6-6. Here the area() method is polymorphic. No Geometry class is necessary. So if I add a new shape, none of the existing functions are affected, but if I add a new function all of the shapes must be changed!1

> 现在来看看代码清单 6-6 中的面向对象方案。这里，area() 方法是多态的。不需要有 Geometry 类。所以，如果添加一个新形状，现有的函数一个也不会受到影响，而当添加新函数时所有的形状都得做修改[1]！

1. There are ways around this that are well known to experienced object-oriented designers: VISITOR, or dual-dispatch, for example. But these techniques carry costs of their own and generally return the structure to that of a procedural program.

Listing 6-6 Polymorphic Shapes

> 代码清单 6-6 多态式形状

```java
public class Square implements Shape {
  private Point topLeft;
  private double side;

  public double area() {
    return side*side;
  }
}

public class Rectangle implements Shape {
  private Point topLeft;
  private double height;
  private double width;

  public double area() {
    return height * width;
  }
}

  public class Circle implements Shape {
    private Point center;
    private double radius;
    public final double PI = 3.141592653589793;

    public double area() {
      return PI * radius * radius;
    }
}
```

Again, we see the complimentary nature of these two definitions; they are virtual opposites! This exposes the fundamental dichotomy between objects and data structures:

> 我们再次看到这两种定义的本质；它们是截然对立的。这说明了对象与数据结构之间的二分原理：

Procedural code (code using data structures) makes it easy to add new functions without changing the existing data structures. OO code, on the other hand, makes it easy to add new classes without changing existing functions.

> 过程式代码（使用数据结构的代码）便于在不改动既有数据结构的前提下添加新函数。面向对象代码便于在不改动既有函数的前提下添加新类。

The complement is also true:

> 反过来讲也说得通：

Procedural code makes it hard to add new data structures because all the functions must change. OO code makes it hard to add new functions because all the classes must change.

> 过程式代码难以添加新数据结构，因为必须修改所有函数。面向对象代码难以添加新函数，因为必须修改所有类。

So, the things that are hard for OO are easy for procedures, and the things that are hard for procedures are easy for OO!

> 所以，对于面向对象较难的事，对于过程式代码却较容易，反之亦然！

In any complex system there are going to be times when we want to add new data types rather than new functions. For these cases objects and OO are most appropriate. On the other hand, there will also be times when we’ll want to add new functions as opposed to data types. In that case procedural code and data structures will be more appropriate.

> 在任何一个复杂系统中，都会有需要添加新数据类型而不是新函数的时候。这时，对象和面向对象就比较适合。另一方面，也会有想要添加新函数而不是数据类型的时候。在这种情况下，过程式代码和数据结构更合适。

Mature programmers know that the idea that everything is an object is a myth. Sometimes you really do want simple data structures with procedures operating on them.

## 6.3 THE LAW OF DEMETER 得墨忒耳律

There is a well-known heuristic called the Law of Demeter2 that says a module should not know about the innards of the objects it manipulates. As we saw in the last section, objects hide their data and expose operations. This means that an object should not expose its internal structure through accessors because to do so is to expose, rather than to hide, its internal structure.

> 著名的得墨忒耳律（The Law of Demeter）[2]认为，模块不应了解它所操作对象的内部情形。如上节所见，对象隐藏数据，曝露操作。这意味着对象不应通过存取器曝露其内部结构，因为这样更像是曝露而非隐藏其内部结构。

2. http://en.wikipedia.org/wiki/Law_of_Demeter

More precisely, the Law of Demeter says that a method f of a class C should only call the methods of these:

> 更准确地说，得墨忒耳律认为，类 C 的方法 f 只应该调用以下对象的方法：

- C
- An object created by f
- An object passed as an argument to f
- An object held in an instance variable of C

---

> - C
> - 由 f 创建的对象；
> - 作为参数传递给 f 的对象；
> - 由 C 的实体变量持有的对象。

The method should not invoke methods on objects that are returned by any of the allowed functions. In other words, talk to friends, not to strangers.

> 方法不应调用由任何函数返回的对象的方法。换言之，只跟朋友谈话，不与陌生人谈话。

The following code3 appears to violate the Law of Demeter (among other things) because it calls the getScratchDir() function on the return value of getOptions() and then calls getAbsolutePath() on the return value of getScratchDir().

> 下列代码[3]违反了得墨忒耳律（除了违反其他规则之外），因为它调用了 getOptions( )返回值的 getScratchDir( )函数，又调用了 getScratchDir( )返回值的 getAbsolutePath( )方法。

3. Found somewhere in the apache framework.

```java
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

### 6.3.1 Train Wrecks 火车失事

This kind of code is often called a train wreck because it look like a bunch of coupled train cars. Chains of calls like this are generally considered to be sloppy style and should be avoided [G36]. It is usually best to split them up as follows:

> 这类代码常被称作火车失事，因为它看起来就像是一列火车。这类连串的调用通常被认为是肮脏的风格，应该避免[G36]。最好做类似如下的切分：

```java
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```

Are these two snippets of code violations of the Law of Demeter? Certainly the containing module knows that the ctxt object contains options, which contain a scratch directory, which has an absolute path. That’s a lot of knowledge for one function to know. The calling function knows how to navigate through a lot of different objects.

> 上列代码是否违反了得墨忒耳律呢？当然，模块知道 ctxt 对象包含有多个选项，每个选项中都有一个临时目录，而每个临时目录都有一个绝对路径。对于一个函数，这些知识真够丰富的。调用函数懂得如何在一大堆不同对象间浏览。

![](figures/ch6/6_2fig_martin.jpg)

Whether this is a violation of Demeter depends on whether or not ctxt, Options, and ScratchDir are objects or data structures. If they are objects, then their internal structure should be hidden rather than exposed, and so knowledge of their innards is a clear violation of the Law of Demeter. On the other hand, if ctxt, Options, and ScratchDir are just data structures with no behavior, then they naturally expose their internal structure, and so Demeter does not apply.

> 这些代码是否违反得墨忒耳律，取决于 ctxt、Options 和 ScratchDir 是对象还是数据结构。如果是对象，则它们的内部结构应当隐藏而不曝露，而有关其内部细节的知识就明显违反了得墨忒耳律。如果 ctxt、Options 和 ScratchDir 只是数据结构，没有任何行为，则它们自然会曝露其内部结构，得墨忒耳律也就不适用了。

The use of accessor functions confuses the issue. If the code had been written as follows, then we probably wouldn’t be asking about Demeter violations.

> 属性访问器函数的使用把问题搞复杂了。如果像下面这样写代码，我们大概就不会提及对得墨忒耳律的违反。

```java
final String outputDir = ctxt.options.scratchDir.absolutePath;
```

This issue would be a lot less confusing if data structures simply had public variables and no functions, whereas objects had private variables and public functions. However, there are frameworks and standards (e.g., “beans”) that demand that even simple data structures have accessors and mutators.

> 如果数据结构只简单地拥有公共变量，没有函数，而对象则拥有私有变量和公共函数，这个问题就不那么混淆。然而，有些框架和标准甚至要求最简单的数据结构都要有访问器和改值器。

### 6.3.2 Hybrids 混杂

This confusion sometimes leads to unfortunate hybrid structures that are half object and half data structure. They have functions that do significant things, and they also have either public variables or public accessors and mutators that, for all intents and purposes, make the private variables public, tempting other external functions to use those variables the way a procedural program would use a data structure.4

> 这种混淆有时会不幸导致混合结构，一半是对象，一半是数据结构。这种结构拥有执行操作的函数，也有公共变量或公共访问器及改值器。无论出于怎样的初衷，公共访问器及改值器都把私有变量公开化，诱导外部函数以过程式程序使用数据结构的方式使用这些变量[4]。

4. This is sometimes called Feature Envy from [Refactoring].

Such hybrids make it hard to add new functions but also make it hard to add new data structures. They are the worst of both worlds. Avoid creating them. They are indicative of a muddled design whose authors are unsure of—or worse, ignorant of—whether they need protection from functions or types.

> 此类混杂增加了添加新函数的难度，也增加了添加新数据结构的难度，两面不讨好。应避免创造这种结构。它们的出现，展示了一种乱七八糟的设计，其作者不确定——或者更糟糕，完全无视——他们是否需要函数或类型的保护。

### 6.3.3 Hiding Structure 隐藏结构

What if ctxt, options, and scratchDir are objects with real behavior? Then, because objects are supposed to hide their internal structure, we should not be able to navigate through them. How then would we get the absolute path of the scratch directory?

> 假使 ctxt、Options 和 ScratchDir 是拥有真实行为的对象又怎样呢？由于对象应隐藏其内部结构，我们就不该能够看到内部结构。这样一来，如何才能取得临时目录的绝对路径呢？

```java
ctxt.getAbsolutePathOfScratchDirectoryOption();
```

or

> 或者

```java
ctx.getScratchDirectoryOption().getAbsolutePath()
```

The first option could lead to an explosion of methods in the ctxt object. The second presumes that getScratchDirectoryOption() returns a data structure, not an object. Neither option feels good.

> 第一种方案可能导致 ctxt 对象中方法的曝露。第二种方案是在假设 getScratchDirectoryOption()返回一个数据结构而非对象。两种方案感觉都不好。

If ctxt is an object, we should be telling it to do something; we should not be asking it about its internals. So why did we want the absolute path of the scratch directory? What were we going to do with it? Consider this code from (many lines farther down in) the same module:

> 如果 ctxt 是个对象，就应该要求它做点什么，不该要求它给出内部情形。那我们为何还要得到临时目录的绝对路径呢？我们要它做什么？来看看同一模块（许多行之后）的这段代码：

```java
String outFile = outputDir + “/” + className.replace('.', '/') + “.class”;
FileOutputStream fout = new FileOutputStream(outFile);
BufferedOutputStream bos = new BufferedOutputStream(fout);
```

The admixture of different levels of detail [G34][g6] is a bit troubling. Dots, slashes, file extensions, and File objects should not be so carelessly mixed together, and mixed with the enclosing code. Ignoring that, however, we see that the intent of getting the absolute path of the scratch directory was to create a scratch file of a given name.

> 这种不同层级细节的混杂（[G34][g36]）有点麻烦。句点、斜杠、文件扩展名和 File 对象不该如此随便地混杂到一起。不过，撇开这些毛病，我们发现，取得临时目录绝对路径的初衷是为了创建指定名称的临时文件。

So, what if we told the ctxt object to do this?

> 所以，直接让 ctxt 对象来做这事如何？

```java
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
```

That seems like a reasonable thing for an object to do! This allows ctxt to hide its internals and prevents the current function from having to violate the Law of Demeter by navigating through objects it shouldn’t know about.

> 这下看起来像是个对象做的事了！ctxt 隐藏了其内部结构，防止当前函数因浏览它不该知道的对象而违反得墨忒耳律。

## 6.4 DATA TRANSFER OBJECTS 数据传送对象

The quintessential form of a data structure is a class with public variables and no functions. This is sometimes called a data transfer object, or DTO. DTOs are very useful structures, especially when communicating with databases or parsing messages from sockets, and so on. They often become the first in a series of translation stages that convert raw data in a database into objects in the application code.

> 最为精练的数据结构，是一个只有公共变量、没有函数的类。这种数据结构有时被称为数据传送对象，或 DTO（Data Transfer Objects）。 DTO 是非常有用的结构，尤其是在与数据库通信、或解析套接字传递的消息之类场景中。在应用程序代码里一系列将原始数据转换为数据库的翻译过程中，它们往往是排头兵。

Somewhat more common is the “bean” form shown in Listing 6-7. Beans have private variables manipulated by getters and setters. The quasi-encapsulation of beans seems to make some OO purists feel better but usually provides no other benefit.

> 更常见的是如代码清单 6-7 所示的“豆”（bean）结构。豆结构拥有由赋值器和取值器操作的私有变量。对豆结构的半封装会让某些 OO 纯化论者感觉舒服些，不过通常没有其他好处。

Listing 6-7 address.java

> 代码清单 6-7 address.java

```java
public class Address {
  private String street;
  private String streetExtra;
  private String city;
  private String state;
  private String zip;

  public Address(String street, String streetExtra,
                  String city, String state, String zip) {
    this.street = street;
    this.streetExtra = streetExtra;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }

  public String getStreet() {
    return street;
  }

  public String getStreetExtra() {
    return streetExtra;
  }

  public String getCity() {
    return city;
  }

  public String getState() {
    return state;
  }

  public String getZip() {
    return zip;
  }
}
```

### Active Record

Active Records are special forms of DTOs. They are data structures with public (or bean-accessed) variables; but they typically have navigational methods like save and find. Typically these Active Records are direct translations from database tables, or other data sources.

> Active Record 是一种特殊的 DTO 形式。它们是拥有公共（或可豆式访问的）变量的数据结构，但通常也会拥有类似 save 和 find 这样的可浏览方法。Active Record 一般是对数据库表或其他数据源的直接翻译。

Unfortunately we often find that developers try to treat these data structures as though they were objects by putting business rule methods in them. This is awkward because it creates a hybrid between a data structure and an object.

> 我们不幸经常发现开发者往这类数据结构中塞进业务规则方法，把这类数据结构当成对象来用。这是不智的行为，因为它导致了数据结构和对象的混杂体。

The solution, of course, is to treat the Active Record as a data structure and to create separate objects that contain the business rules and that hide their internal data (which are probably just instances of the Active Record).

> 当然，解决方案就是把 Active Record 当做数据结构，并创建包含业务规则、隐藏内部数据（可能就是 Active Record 的实体）的独立对象。

## 6.5 CONCLUSION 小结

Objects expose behavior and hide data. This makes it easy to add new kinds of objects without changing existing behaviors. It also makes it hard to add new behaviors to existing objects. Data structures expose data and have no significant behavior. This makes it easy to add new behaviors to existing data structures but makes it hard to add new data structures to existing functions.

> 对象曝露行为，隐藏数据。便于添加新对象类型而无需修改既有行为，同时也难以在既有对象中添加新行为。数据结构曝露数据，没有明显的行为。便于向既有数据结构添加新行为，同时也难以向既有函数添加新数据结构。

In any given system we will sometimes want the flexibility to add new data types, and so we prefer objects for that part of the system. Other times we will want the flexibility to add new behaviors, and so in that part of the system we prefer data types and procedures. Good software developers understand these issues without prejudice and choose the approach that is best for the job at hand.

> 在任何系统中，我们有时会希望能够灵活地添加新数据类型，所以更喜欢在这部分使用对象。另外一些时候，我们希望能灵活地添加新行为，这时我们更喜欢使用数据类型和过程。优秀的软件开发者不带成见地了解这种情形，并依据手边工作的性质选择其中一种手段。
