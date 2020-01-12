# 第 4 章 Comments 注释

![](figures/ch4/4_1fig_martin.jpg)

“Don’t comment bad code—rewrite it.”—Brian W. Kernighan and P. J. Plaugher1

> “别给糟糕的代码加注释——重新写吧。”——Brian W. Kernighan 与 P. J.

1. [KP78], p. 144.

Nothing can be quite so helpful as a well-placed comment. Nothing can clutter up a module more than frivolous dogmatic comments. Nothing can be quite so damaging as an old crufty comment that propagates lies and misinformation.

> 什么也比不上放置良好的注释来得有用。什么也不会比乱七八糟的注释更有本事搞乱一个模块。什么也不会比陈旧、提供错误信息的注释更有破坏性。

Comments are not like Schindler’s List. They are not “pure good.” Indeed, comments are, at best, a necessary evil. If our programming languages were expressive enough, or if we had the talent to subtly wield those languages to express our intent, we would not need comments very much—perhaps not at all.

> 注释并不像辛德勒的名单。它们并不“纯然地好”。实际上，注释最多也就是一种必须的恶。若编程语言足够有表达力，或者我们长于用这些语言来表达意图，就不那么需要注释——也许根本不需要。

The proper use of comments is to compensate for our failure to express ourself in code. Note that I used the word failure. I meant it. Comments are always failures. We must have them because we cannot always figure out how to express ourselves without them, but their use is not a cause for celebration.

> 注释的恰当用法是弥补我们在用代码表达意图时遭遇的失败。注意，我用了“失败”一词。我是说真的。注释总是一种失败。我们总无法找到不用注释就能表达自我的方法，所以总要有注释，这并不值得庆贺。

So when you find yourself in a position where you need to write a comment, think it through and see whether there isn’t some way to turn the tables and express yourself in code. Every time you express yourself in code, you should pat yourself on the back. Every time you write a comment, you should grimace and feel the failure of your ability of expression.

> 如果你发现自己需要写注释，再想想看是否有办法翻盘，用代码来表达。每次用代码表达，你都该夸奖一下自己。每次写注释，你都该做个鬼脸，感受自己在表达能力上的失败。

Why am I so down on comments? Because they lie. Not always, and not intentionally, but too often. The older a comment is, and the farther away it is from the code it describes, the more likely it is to be just plain wrong. The reason is simple. Programmers can’t realistically maintain them.

> 我为什么要极力贬低注释？因为注释会撒谎。也不是说总是如此或有意如此，但出现得实在太频繁。注释存在的时间越久，就离其所描述的代码越远，越来越变得全然错误。原因很简单。程序员不能坚持维护注释。

Code changes and evolves. Chunks of it move from here to there. Those chunks bifurcate and reproduce and come together again to form chimeras. Unfortunately the comments don’t always follow them—can’t always follow them. And all too often the comments get separated from the code they describe and become orphaned blurbs of ever-decreasing accuracy. For example, look what has happened to this comment and the line it was intended to describe:

> 代码在变动，在演化。从这里移到那里。彼此分离、重造又合到一处。很不幸，注释并不总是随之变动——不能总是跟着走。注释常常会与其所描述的代码分隔开来，孑然飘零，越来越不准确。例如，看看以下注释以及它本来要描述的代码行变成了什么样子：

```java
MockRequest request;
private final String HTTP_DATE_REGEXP =
  “[SMTWF][a-z]{2}\\,\\s[0-9]{2}\\s[JFMASOND][a-z]{2}\\s”+
  “[0-9]{4}\\s[0-9]{2}\\:[0-9]{2}\\:[0-9]{2}\\sGMT”;
private Response response;
private FitNesseContext context;
private FileResponder responder;
private Locale saveLocale;
// Example: ”Tue, 02 Apr 2003 22:18:49 GMT”
```

Other instance variables that were probably added later were interposed between the HTTP_DATE_REGEXP constant and it’s explanatory comment.

> 在 HTTP_DATE_REGEXP 常量及其注释之间，有可能插入其他实体变量。

It is possible to make the point that programmers should be disciplined enough to keep the comments in a high state of repair, relevance, and accuracy. I agree, they should. But I would rather that energy go toward making the code so clear and expressive that it does not need the comments in the first place.

> 程序员应当负责将注释保持在可维护、有关联、精确的高度。我同意这种说法。但我更主张把力气用在写清楚代码上，直接保证无须编写注释。

Inaccurate comments are far worse than no comments at all. They delude and mislead. They set expectations that will never be fulfilled. They lay down old rules that need not, or should not, be followed any longer.

> 不准确的注释要比没注释坏得多。它们满口胡言。它们预期的东西永不能实现。它们设定了无需也不应再遵循的旧规则。

Truth can only be found in one place: the code. Only the code can truly tell you what it does. It is the only source of truly accurate information. Therefore, though comments are sometimes necessary, we will expend significant energy to minimize them.

> 真实只在一处地方有：代码。只有代码能忠实地告诉你它做的事。那是唯一真正准确的信息来源。所以，尽管有时也需要注释，我们也该多花心思尽量减少注释量。

## 4.1 COMMENTS DO NOT MAKE UP FOR BAD CODE 注释不能美化糟糕的代码

One of the more common motivations for writing comments is bad code. We write a module and we know it is confusing and disorganized. We know it’s a mess. So we say to ourselves, “Ooh, I’d better comment that!” No! You’d better clean it!

> 写注释的常见动机之一是糟糕的代码的存在。我们编写一个模块，发现它令人困扰、乱七八糟。我们知道，它烂透了。我们告诉自己：“喔，最好写点注释！”不！最好是把代码弄干净！

Clear and expressive code with few comments is far superior to cluttered and complex code with lots of comments. Rather than spend your time writing the comments that explain the mess you’ve made, spend it cleaning that mess.

> 带有少量注释的整洁而有表达力的代码，要比带有大量注释的零碎而复杂的代码像样得多。与其花时间编写解释你搞出的糟糕的代码的注释，不如花时间清洁那堆糟糕的代码。

## 4.2 EXPLAIN YOURSELF IN CODE 用代码来阐述

There are certainly times when code makes a poor vehicle for explanation. Unfortunately, many programmers have taken this to mean that code is seldom, if ever, a good means for explanation. This is patently false. Which would you rather see? This:

> 有时，代码本身不足以解释其行为。不幸的是，许多程序员据此以为代码很少——如果有的话——能做好解释工作。这种观点纯属错误。

```java
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) &&
    (employee.age > 65))
```

Or this?

> 你愿意看到这个：

```java
if (employee.isEligibleForFullBenefits())
```

It takes only a few seconds of thought to explain most of your intent in code. In many cases it’s simply a matter of creating a function that says the same thing as the comment you want to write.

> 只要想上那么几秒钟，就能用代码解释你大部分的意图。很多时候，简单到只需要创建一个描述与注释所言同一事物的函数即可。

## 4.3 GOOD COMMENTS 好注释

Some comments are necessary or beneficial. We’ll look at a few that I consider worthy of the bits they consume. Keep in mind, however, that the only truly good comment is the comment you found a way not to write.

> 有些注释是必须的，也是有利的。来看看一些我认为值得写的注释。不过要记住，唯一真正好的注释是你想办法不去写的注释。

### 4.3.1 Legal Comments 法律信息

Sometimes our corporate coding standards force us to write certain comments for legal reasons. For example, copyright and authorship statements are necessary and reasonable things to put into a comment at the start of each source file.

> 有时，公司代码规范要求编写与法律有关的注释。例如，版权及著作权声明就是必须和有理由在每个源文件开头注释处放置的内容。

Here, for example, is the standard comment header that we put at the beginning of every source file in FitNesse. I am happy to say that our IDE hides this comment from acting as clutter by automatically collapsing it.

> 下例是我们在 FitNesse 项目每个源文件开头放置的标准注释。我可以很开心地说，IDE 自动卷起这些注释，这样就不会显得凌乱了。

```java
// Copyright (C) 2003,2004,2005 by Object Mentor, Inc. All rights reserved.
// Released under the terms of the GNU General Public License version 2 or later.
```

Comments like this should not be contracts or legal tomes. Where possible, refer to a standard license or other external document rather than putting all the terms and conditions into the comment.

> 这类注释不应是合同或法典。只要有可能，就指向一份标准许可或其他外部文档，而不要把所有条款放到注释中。

### 4.3.2 Informative Comments 提供信息的注释

It is sometimes useful to provide basic information with a comment. For example, consider this comment that explains the return value of an abstract method:

> 有时，用注释来提供基本信息也有其用处。例如，以下注释解释了某个抽象方法的返回值：

```java
// Returns an instance of the Responder being tested.
protected abstract Responder responderInstance();
```

A comment like this can sometimes be useful, but it is better to use the name of the function to convey the information where possible. For example, in this case the comment could be made redundant by renaming the function: responderBeingTested.

> 这类注释有时管用，但更好的方式是尽量利用函数名称传达信息。比如，在本例中，只要把函数重新命名为 responderBeingTested，注释就是多余的了。

Here’s a case that’s a bit better:

> 下例稍好一些：

```java
// format matched kk:mm:ss EEE, MMM dd, yyyy
Pattern timeMatcher = Pattern.compile(
  “\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*”);
```

In this case the comment lets us know that the regular expression is intended to match a time and date that were formatted with the SimpleDateFormat.format function using the specified format string. Still, it might have been better, and clearer, if this code had been moved to a special class that converted the formats of dates and times. Then the comment would likely have been superfluous.

> SimpleDateFormat.format 函数利用特定格式字符串格式化的时间和日期。同样，如果把这段代码移到某个转换日期和时间格式的类中，就会更好、更清晰，而注释也就变得多此一举了。

### 4.3.3 Explanation of Intent 对意图的解释

Sometimes a comment goes beyond just useful information about the implementation and provides the intent behind a decision. In the following case we see an interesting decision documented by a comment. When comparing two objects, the author decided that he wanted to sort objects of his class higher than objects of any other.

> 有时，注释不仅提供了有关实现的有用信息，而且还提供了某个决定后面的意图。在下例中，我们看到注释反映出来的一个有趣决定。在对比两个对象时，作者决定将他的类放置在比其他东西更高的位置。

```java
public int compareTo(Object o)
{
  if(o instanceof WikiPagePath)
  {
    WikiPagePath p = (WikiPagePath) o;
    String compressedName = StringUtil.join(names, “”);
    String compressedArgumentName = StringUtil.join(p.names, “”);
    return compressedName.compareTo(compressedArgumentName);
  }
  return 1; // we are greater because we are the right type.
}
```

Here’s an even better example. You might not agree with the programmer’s solution to the problem, but at least you know what he was trying to do.

> 下面的例子甚至更好。你也许不同意程序员给这个问题提供的解决方案，但至少你知道他想干什么。

```java
public void testConcurrentAddWidgets() throws Exception {
  WidgetBuilder widgetBuilder =
    new WidgetBuilder(new Class[]{BoldWidget.class});
    String text = ”’’’bold text’’’”;
    ParentWidget parent =
      new BoldWidget(new MockWidgetRoot(), ”’’’bold text’’’”);
    AtomicBoolean failFlag = new AtomicBoolean();
    failFlag.set(false);

    //This is our best attempt to get a race condition
    //by creating large number of threads.
    for (int i = 0; i < 25000; i++) {
      WidgetBuilderThread widgetBuilderThread =
        new WidgetBuilderThread(widgetBuilder, text, parent, failFlag);
      Thread thread = new Thread(widgetBuilderThread);
      thread.start();
    }
    assertEquals(false, failFlag.get());
  }
```

### 4.3.4 Clarification 阐释

Sometimes it is just helpful to translate the meaning of some obscure argument or return value into something that’s readable. In general it is better to find a way to make that argument or return value clear in its own right; but when its part of the standard library, or in code that you cannot alter, then a helpful clarifying comment can be useful.

> 有时，注释把某些晦涩难明的参数或返回值的意义翻译为某种可读形式，也会是有用的。通常，更好的方法是尽量让参数或返回值自身就足够清楚；但如果参数或返回值是某个标准库的一部分，或是你不能修改的代码，帮助阐释其含义的代码就会有用。

```java
public void testCompareTo() throws Exception
{
  WikiPagePath a = PathParser.parse("PageA");
  WikiPagePath ab = PathParser.parse("PageA.PageB");
  WikiPagePath b = PathParser.parse("PageB");
  WikiPagePath aa = PathParser.parse("PageA.PageA");
  WikiPagePath bb = PathParser.parse("PageB.PageB");
  WikiPagePath ba = PathParser.parse("PageB.PageA");

  assertTrue(a.compareTo(a) == 0);    // a == a
  assertTrue(a.compareTo(b) != 0);    // a != b
  assertTrue(ab.compareTo(ab) == 0);  // ab == ab
  assertTrue(a.compareTo(b) == -1);   // a < b
  assertTrue(aa.compareTo(ab) == -1); // aa < ab
  assertTrue(ba.compareTo(bb) == -1); // ba < bb
  assertTrue(b.compareTo(a) == 1);    // b > a
  assertTrue(ab.compareTo(aa) == 1);  // ab > aa
  assertTrue(bb.compareTo(ba) == 1);  // bb > ba
}
```

There is a substantial risk, of course, that a clarifying comment is incorrect. Go through the previous example and see how difficult it is to verify that they are correct. This explains both why the clarification is necessary and why it’s risky. So before writing comments like this, take care that there is no better way, and then take even more care that they are accurate.

> 当然，这也会冒阐释性注释本身就不正确的风险。回头看看上例，你会发现想要确认注释的正确性有多难。这一方面说明了阐释有多必要，另外也说明了它有风险。所以，在写这类注释之前，考虑一下是否还有更好的办法，然后再加倍小心地确认注释正确性。

### 4.3.5 Warning of Consequences 警示

Sometimes it is useful to warn other programmers about certain consequences. For example, here is a comment that explains why a particular test case is turned off:

> 有时，用于警告其他程序员会出现某种后果的注释也是有用的。例如，下面的注释解释了为什么要关闭某个特定的测试用例：

![](figures/ch4/4_2fig_martin.jpg)

```java
// Don't run unless you
// have some time to kill.
public void _testWithReallyBigFile()
{
  writeLinesToFile(10000000);

  response.setBody(testFile);
  response.readyToSend(this);
  String responseString = output.toString();
  assertSubString("Content-Length: 1000000000", responseString);
  assertTrue(bytesSent > 1000000000);
}
```

Nowadays, of course, we’d turn off the test case by using the @Ignore attribute with an appropriate explanatory string. @Ignore(”Takes too long to run”). But back in the days before JUnit 4, putting an underscore in front of the method name was a common convention. The comment, while flippant, makes the point pretty well.

> 当然，如今我们多数会利用附上恰当解释性字符串的@Ignore 属性来关闭测试用例。比如@Ignore("Takes too long to run[2]")。但在 JUnit4 之前的日子里，惯常的做法是在方法名前面加上下划线。如果注释足够有说服力，就会很有用了。

Here’s another, more poignant example:

> 这里有个更麻烦的例子：

```java
public static
  SimpleDateFormat makeStandardHttpDateFormat()
{
  //SimpleDateFormat is not thread safe,
  //so we need to create each instance independently.
  SimpleDateFormat df = new SimpleDateFormat(”EEE, dd MMM  yyyy HH:mm:ss z”);
  df.setTimeZone(TimeZone.getTimeZone(”GMT”));
  return df;
}
```

You might complain that there are better ways to solve this problem. I might agree with you. But the comment, as given here, is perfectly reasonable. It will prevent some overly eager programmer from using a static initializer in the name of efficiency.

> 你也许会抱怨说，还会有更好的解决方法。我大概会同意。不过上面的注释绝对有道理存在，它能阻止某位急切的程序员以效率之名使用静态初始器。

### 4.3.6 TODO Comments TODO 注释

It is sometimes reasonable to leave “To do” notes in the form of //TODO comments. In the following case, the TODO comment explains why the function has a degenerate implementation and what that function’s future should be.

> 有时，有理由用//TODO 形式在源代码中放置要做的工作列表。在下例中，TODO 注释解释了为什么该函数的实现部分无所作为，将来应该是怎样。

```java
//TODO-MdM these are not needed
// We expect this to go away when we do the checkout model
protected VersionInfo makeVersion() throws Exception
{
  return null;
}
```

TODOs are jobs that the programmer thinks should be done, but for some reason can’t do at the moment. It might be a reminder to delete a deprecated feature or a plea for someone else to look at a problem. It might be a request for someone else to think of a better name or a reminder to make a change that is dependent on a planned event. Whatever else a TODO might be, it is not an excuse to leave bad code in the system.

> TODO 是一种程序员认为应该做，但由于某些原因目前还没做的工作。它可能是要提醒删除某个不必要的特性，或者要求他人注意某个问题。它可能是恳请别人取个好名字，或者提示对依赖于某个计划事件的修改。无论 TODO 的目的如何，它都不是在系统中留下糟糕的代码的借口。

Nowadays, most good IDEs provide special gestures and features to locate all the TODO comments, so it’s not likely that they will get lost. Still, you don’t want your code to be littered with TODOs. So scan through them regularly and eliminate the ones you can.

> 如今，大多数好 IDE 都提供了特别的手段来定位所有 TODO 注释，这些注释看来丢不了。你不会愿意代码因为 TODO 的存在而变成一堆垃圾，所以要定期查看，删除不再需要的。

### 4.3.7 Amplification 放大

A comment may be used to amplify the importance of something that may otherwise seem inconsequential.

> 注释可以用来放大某种看来不合理之物的重要性。

```java
String listItemContent = match.group(3).trim();
// the trim is real important.  It removes the starting
// spaces that could cause the item to be recognized
// as another list.
new ListItemWidget(this, listItemContent, this.level + 1);
return buildList(text.substring(match.end()));
```

### 4.3.8 Javadocs in Public APIs 公共 API 中的 Javadoc

There is nothing quite so helpful and satisfying as a well-described public API. The java-docs for the standard Java library are a case in point. It would be difficult, at best, to write Java programs without them.

> 没有什么比被良好描述的公共 API 更有用和令人满意的了。标准 Java 库中的 Javadoc 就是一例。没有它们，写 Java 程序就会变得很难。

If you are writing a public API, then you should certainly write good javadocs for it. But keep in mind the rest of the advice in this chapter. Javadocs can be just as misleading, nonlocal, and dishonest as any other kind of comment.

> 如果你在编写公共 API，就该为它编写良好的 Javadoc。不过要记住本章中的其他建议。就像其他注释一样，Javadoc 也可能误导、不适用或者提供错误信息。

## 4.4 BAD COMMENTS 坏注释

Most comments fall into this category. Usually they are crutches or excuses for poor code or justifications for insufficient decisions, amounting to little more than the programmer talking to himself.

> 大多数注释都属此类。通常，坏注释都是糟糕的代码的支撑或借口，或者对错误决策的修正，基本上等于程序员自说自话。

### 4.4.1 Mumbling 喃喃自语

Plopping in a comment just because you feel you should or because the process requires it, is a hack. If you decide to write a comment, then spend the time necessary to make sure it is the best comment you can write.

> 如果只是因为你觉得应该或者因为过程需要就添加注释，那就是无谓之举。如果你决定写注释，就要花必要的时间确保写出最好的注释。

Here, for example, is a case I found in FitNesse, where a comment might indeed have been useful. But the author was in a hurry or just not paying much attention. His mumbling left behind an enigma:

> 例如，我在 FitNesse 中找到的这个例子，例中的注释大概确实有用。不过，作者太着急，或者没太花心思。他的喃喃自语变成了一个谜团。

```java
public void loadProperties()
{
  try
  {
  String propertiesPath = propertiesLocation +
    ”/” + PROPERTIES_FILE;
  FileInputStream propertiesStream = new
    FileInputStream(propertiesPath);
  loadedProperties.load(propertiesStream);
  }
  catch(IOException e)
  {
    // No properties files means all defaults are loaded
  }
}
```

What does that comment in the catch block mean? Clearly it meant something to the author, but the meaning does not come through all that well. Apparently, if we get an IOException, it means that there was no properties file; and in that case all the defaults are loaded. But who loads all the defaults? Were they loaded before the call to loadProperties.load? Or did loadProperties.load catch the exception, load the defaults, and then pass the exception on for us to ignore? Or did loadProperties.load load all the defaults before attempting to load the file? Was the author trying to comfort himself about the fact that he was leaving the catch block empty? Or—and this is the scary possibility—was the author trying to tell himself to come back here later and write the code that would load the defaults?

> catch 代码块中的注释是什么意思呢？显然对于作者有其意义，不过并没有好到足够的程度。很明显，如果出现 IOException，就表示没有属性文件；在那种情况下，载入默认设置。但谁来装载默认设置呢？会在对 loadProperties.load 之前装载吗？抑或 loadProperties.load 捕获异常、装载默认设置、再向上传递异常？再或 loadProperties.load 在尝试载入文件前就装载所有默认设置？要么作者只是在安慰自己别在意 catch 代码块的留空？

Our only recourse is to examine the code in other parts of the system to find out what’s going on. Any comment that forces you to look in another module for the meaning of that comment has failed to communicate to you and is not worth the bits it consumes.

> 或者——这种可能最可怕——作者是想告诉自己，将来再回头写装载默认设置的代码？我们唯有检视系统其他部分的代码，弄清事情原委。任何迫使读者查看其他模块的注释，都没能与读者沟通好，不值所费。

### 4.4.2 Redundant Comments 多余的注释

Listing 4-1 shows a simple function with a header comment that is completely redundant. The comment probably takes longer to read than the code itself.

> 代码清单 4-1 展示的简单函数，其头部位置的注释全属多余。读这段注释花的时间没准比读代码花的时间还要长。

Listing 4-1 waitForClose

> 代码清单 4-1 waitForClose

```java
// Utility method that returns when this.closed
    is true. Throws an exception
// if the timeout is reached.
public synchronized void waitForClose(final long timeoutMillis)
throws Exception
{
  if(!closed)
  {
      wait(timeoutMillis);
      if(!closed)
        throw new Exception("MockResponseSender could not be closed");
  }
}
```

What purpose does this comment serve? It’s certainly not more informative than the code. It does not justify the code, or provide intent or rationale. It is not easier to read than the code. Indeed, it is less precise than the code and entices the reader to accept that lack of precision in lieu of true understanding. It is rather like a gladhanding used-car salesman assuring you that you don’t need to look under the hood.

> 这段注释起了什么作用？它并不能比代码本身提供更多的信息。它没有证明代码的意义，也没有给出代码的意图或逻辑。读它并不比读代码更容易。事实上，它不如代码精确，误导读者接受不精确的信息，而不是正确地理解代码。它就像个自来熟的二手车贩子，满口保证你不用打开发动机盖查验。来看看代码清单 4-2 中摘自 Tomcat 项目的无用而多余的 Javadoc 吧。

Now consider the legion of useless and redundant javadocs in Listing 4-2 taken from Tomcat. These comments serve only to clutter and obscure the code. They serve no documentary purpose at all. To make matters worse, I only showed you the first few. There are many more in this module.

> 这些注释只是一味将代码搞得含糊不明。完全没有文档上的价值。下面只列出了靠前面的一些代码，后续模块中还有许多类似情况。

Listing 4-2 ContainerBase.java (Tomcat)

> 代码清单 4-2 ContainerBase.java （Tomcat）

```java
public abstract class ContainerBase
  implements Container, Lifecycle, Pipeline,
  MBeanRegistration, Serializable {

  /**
  * The processor delay for this component.
  */
  protected int backgroundProcessorDelay = -1;


  /**
  * The lifecycle event support for this component.
  */
  protected LifecycleSupport lifecycle =
    new LifecycleSupport(this);


  /**
  * The container event listeners for this Container.
  */
  protected ArrayList listeners = new ArrayList();


  /**
  * The Loader implementation with which this Container is
  * associated.
  */
  protected Loader loader = null;


  /**
  * The Logger implementation with which this Container is
  * associated.
  */
  protected Log logger = null;


  /**
  * Associated logger name.
  */
  protected String logName = null;

  /**
    * The Manager implementation with which this Container is
    * associated.
    */
  protected Manager manager = null;


  /**
  * The cluster with which this Container is associated.
  */
  protected Cluster cluster = null;


  /**
  * The human-readable name of this Container.
  */
  protected String name = null;


  /**
  * The parent Container to which this Container is a child.
  */
  protected Container parent = null;


  /**
  * The parent class loader to be configured when we install a
  * Loader.
  */
  protected ClassLoader parentClassLoader = null;


  /**
  * The Pipeline object with which this Container is
  * associated.
  */
  protected Pipeline pipeline = new StandardPipeline(this);


  /**
  * The Realm with which this Container is associated.
  */
  protected Realm realm = null;


  /**
  * The resources DirContext object with which this Container
  * is associated.
  */
  protected DirContext resources = null;
```

### 4.4.3 Misleading Comments 误导性注释

Sometimes, with all the best intentions, a programmer makes a statement in his comments that isn’t precise enough to be accurate. Consider for another moment the badly redundant but also subtly misleading comment we saw in Listing 4-1.

> 有时，尽管初衷可嘉，程序员还是会写出不够精确的注释。想想看代码清单 4-1 中那多余而又有误导嫌疑的注释吧。

Did you discover how the comment was misleading? The method does not return when this.closed becomes true. It returns if this.closed is true; otherwise, it waits for a blind time-out and then throws an exception if this.closed is still not true.

> 你有没有发现那样的注释是如何误导读者的？在 this.closed 变为 true 的时候，方法并没有返回。方法只在判断到 this.closed 为 true 的时候返回，否则，就只是等待遥遥无期的超时，然后如果判断 this.closed 还是非 true，就抛出一个异常。

This subtle bit of misinformation, couched in a comment that is harder to read than the body of the code, could cause another programmer to blithely call this function in the expectation that it will return as soon as this.closed becomes true. That poor programmer would then find himself in a debugging session trying to figure out why his code executed so slowly.

> 这一细微的误导信息，放在比代码本身更难阅读的注释里面，有可能导致其他程序员快活地调用这个函数，并期望在 this.closed 变为 true 时立即返回。那位可怜的程序员将会发现自己陷于调试困境之中，拼命想找出代码执行得如此之慢的原因。

### 4.4.4 Mandated Comments 循规式注释

It is just plain silly to have a rule that says that every function must have a javadoc, or every variable must have a comment. Comments like this just clutter up the code, propagate lies, and lend to general confusion and disorganization.

> 所谓每个函数都要有 Javadoc 或每个变量都要有注释的规矩全然是愚蠢可笑的。这类注释徒然让代码变得散乱，满口胡言，令人迷惑不解。

For example, required javadocs for every function lead to abominations such as Listing 4-3. This clutter adds nothing and serves only to obfuscate the code and create the potential for lies and misdirection.

> 例如，要求每个函数都要有 Javadoc，就会得到类似代码清单 4-3 那样面目可憎的代码。这类废话只会搞乱代码，有可能误导读者。

Listing 4-3

> 代码清单 4-3

```java
/**
*
* @param title The title of the CD
* @param author The author of the CD
* @param tracks The number of tracks on the CD
* @param durationInMinutes The duration of the CD in minutes
*/
public void addCD(String title, String author,
                  int tracks, int durationInMinutes) {
  CD cd = new CD();
  cd.title = title;
  cd.author = author;
  cd.tracks = tracks;
  cd.duration = duration;
  cdList.add(cd);
}
```

### 4.4.5 Journal Comments 日志式注释

Sometimes people add a comment to the start of a module every time they edit it. These comments accumulate as a kind of journal, or log, of every change that has ever been made. I have seen some modules with dozens of pages of these run-on journal entries.

> 有人会在每次编辑代码时，在模块开始处添加一条注释。这类注释就像是一种记录每次修改的日志。我见过满篇尽是这类日志的代码模块。

```java
* Changes (from 11-Oct-2001)
* --------------------------
* 11-Oct-2001 : Re-organised the class and moved it to new package
*               com.jrefinery.date (DG);
* 05-Nov-2001 : Added a getDescription() method, and eliminated NotableDate
*               class (DG);
* 12-Nov-2001 : IBD requires setDescription() method, now that NotableDate
*               class is gone (DG);  Changed getPreviousDayOfWeek(),
*               getFollowingDayOfWeek() and getNearestDayOfWeek() to correct
*               bugs (DG);
* 05-Dec-2001 : Fixed bug in SpreadsheetDate class (DG);
* 29-May-2002 : Moved the month constants into a separate interface
*               (MonthConstants) (DG);
* 27-Aug-2002 : Fixed bug in addMonths() method, thanks to N???levka Petr (DG);
* 03-Oct-2002 : Fixed errors reported by Checkstyle (DG);
* 13-Mar-2003 : Implemented Serializable (DG);
* 29-May-2003 : Fixed bug in addMonths method (DG);
* 04-Sep-2003 : Implemented Comparable.  Updated the isInRange javadocs (DG);
* 05-Jan-2005 : Fixed bug in addYears() method (1096282) (DG);
```

Long ago there was a good reason to create and maintain these log entries at the start of every module. We didn’t have source code control systems that did it for us. Nowadays, however, these long journals are just more clutter to obfuscate the module. They should be completely removed.

> 很久以前，在模块开始处创建并维护这些记录还算有道理。那时，我们还没有源代码控制系统可用。如今，这种冗长的记录只会让模块变得凌乱不堪，应当全部删除。

### 4.4.6 Noise Comments 废话注释

Sometimes you see comments that are nothing but noise. They restate the obvious and provide no new information.

> 有时，你会看到纯然是废话的注释。它们对于显然之事喋喋不休，毫无新意。

```java
/**
* Default constructor.
*/
protected AnnualDateRule() {
}
```

No, really? Or how about this:

> 对吧？再看看这个：

```java
/** The day of the month. */
    private int dayOfMonth;
```

And then there’s this paragon of redundancy:

> 这样的废话模范：

```java
/**
  * Returns the day of the month.
  *
  * @return the day of the month.
  */
public int getDayOfMonth() {
  return dayOfMonth;
}
```

These comments are so noisy that we learn to ignore them. As we read through code, our eyes simply skip over them. Eventually the comments begin to lie as the code around them changes.

> 这类注释废话连篇，我们都学会了视而不见。读代码时，眼光不会停留在它们上面。最终，当代码修改之后，这类注释就变作了谎言一堆。

The first comment in Listing 4-4 seems appropriate.2 It explains why the catch block is being ignored. But the second comment is pure noise. Apparently the programmer was just so frustrated with writing try/catch blocks in this function that he needed to vent.

> 代码清单 4-4 中的第一条注释貌似还行[3]。它解释了 catch 代码块为何被忽略。不过第二条注释就纯是废话了。显然，该程序员沮丧于编写函数中那些 try/catch 代码块。

2. The current trend for IDEs to check spelling in comments will be a balm for those of us who read a lot of code.

Listing 4-4 startSending

> 代码清单 4-4 startSending

```java
private void startSending()
{
  try
  {
    doSending();
  }
  catch(SocketException e)
  {
    // normal. someone stopped the request.
  }
  catch(Exception e)
  {
    try
    {
      response.add(ErrorResponder.makeExceptionString(e));
      response.closeAll();
    }
    catch(Exception e1)
    {
      //Give me a break!
    }
  }
}
```

Rather than venting in a worthless and noisy comment, the programmer should have recognized that his frustration could be resolved by improving the structure of his code. He should have redirected his energy to extracting that last try/catch block into a separate function, as shown in Listing 4-5.

> 与其纠缠于毫无价值的废话注释，程序员应该意识到，他的挫败感可以由改进代码结构而消除。他应该把力气花在将最末一个 try/catch 代码块拆解到单独的函数中，如代码清单 4-5 所示。

Listing 4-5 startSending (refactored)

> 代码清单 4-5 startSending（重构之后）

```java
private void startSending()
{
try
{
  doSending();
}
  catch(SocketException e)
  {
    // normal. someone stopped the request.
  }
  catch(Exception e)
  {
    addExceptionAndCloseResponse(e);
  }
}

private void addExceptionAndCloseResponse(Exception e)
{
  try
  {
    response.add(ErrorResponder.makeExceptionString(e));
    response.closeAll();
  }
  catch(Exception e1)
  {
  }
}
```

Replace the temptation to create noise with the determination to clean your code. You’ll find it makes you a better and happier programmer.

> 用整理代码的决心替代创造废话的冲动吧。你会发现自己成为更优秀、更快乐的程序员。

### 4.4.7 Scary Noise 可怕的废话

Javadocs can also be noisy. What purpose do the following Javadocs (from a well-known open-source library) serve? Answer: nothing. They are just redundant noisy comments written out of some misplaced desire to provide documentation.

> Javadoc 也可能是废话。下列 Javadoc（来自某知名开源库）的目的是什么？答案：无。它们只是源自某种提供文档的不当愿望的废话注释。

```java
/** The name. */
private String name;

/** The version. */
private String version;

/** The licenceName. */
private String licenceName;

/** The version. */
private String info;
```

Read these comments again more carefully. Do you see the cut-paste error? If authors aren’t paying attention when comments are written (or pasted), why should readers be expected to profit from them?

> 再仔细读读这些注释。你是否发现了剪切-粘贴错误？如果作者在写（或粘贴）注释时都没花心思，怎么能指望读者从中获益呢？

### 4.4.8 Don’t Use a Comment When You Can Use a Function or a Variable 能用函数或变量时就别用注释

Consider the following stretch of code:

> 看看以下代码概要：

```java
// does the module from the global list <mod> depend on the
// subsystem we are part of?
if (smodule.getDependSubsystems().contains(subSysMod.getSubSystem()))
```

This could be rephrased without the comment as

> 可以改成以下没有注释的版本：

```java
ArrayList moduleDependees = smodule.getDependSubsystems();
String ourSubSystem = subSysMod.getSubSystem();
if (moduleDependees.contains(ourSubSystem))
```

The author of the original code may have written the comment first (unlikely) and then written the code to fulfill the comment. However, the author should then have refactored the code, as I did, so that the comment could be removed.

> 代码原作者可能（不太像）是先写注释再编写代码。不过，作者应该重构代码，如我所做的那样，从而删掉注释。

### 4.4.9 Position Markers 位置标记

Sometimes programmers like to mark a particular position in a source file. For example, I recently found this in a program I was looking through:

> 有时，程序员喜欢在源代码中标记某个特别位置。例如，最近我在程序中看到这样一行：

```java
// Actions //////////////////////////////////
```

There are rare times when it makes sense to gather certain functions together beneath a banner like this. But in general they are clutter that should be eliminated—especially the noisy train of slashes at the end.

> 把特定函数趸放在这种标记栏下面，多数时候实属无理。鸡零狗碎，理当删除——特别是尾部那一长串无用的斜杠。

Think of it this way. A banner is startling and obvious if you don’t see banners very often. So use them very sparingly, and only when the benefit is significant. If you overuse banners, they’ll fall into the background noise and be ignored.

> 这么说吧。如果标记栏不多，就会显而易见。所以，尽量少用标记栏，只在特别有价值的时候用。如果滥用标记栏，就会沉没在背景噪音中，被忽略掉。

### 4.4.10 Closing Brace Comments 括号后面的注释

Sometimes programmers will put special comments on closing braces, as in Listing 4-6. Although this might make sense for long functions with deeply nested structures, it serves only to clutter the kind of small and encapsulated functions that we prefer. So if you find yourself wanting to mark your closing braces, try to shorten your functions instead.

> 有时，程序员会在括号后面放置特殊的注释，如代码清单 4-6 所示。尽管这对于含有深度嵌套结构的长函数可能有意义，但只会给我们更愿意编写的短小、封装的函数带来混乱。如果你发现自己想标记右括号，其实应该做的是缩短函数。

Listing 4-6 wc.java

> 代码清单 4-6 wc.java

```java
public class wc {
  public static void main(String[] args) {
    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    String line;
    int lineCount = 0;
    int charCount = 0;
    int wordCount = 0;
    try {
      while ((line = in.readLine()) != null) {
        lineCount++;
        charCount += line.length();
        String words[] = line.split("\\W");
        wordCount += words.length;
      } //while
      System.out.println("wordCount = " + wordCount);
      System.out.println("lineCount = " + lineCount);
      System.out.println("charCount = " + charCount);
    } // try
    catch (IOException e) {
      System.err.println("Error:" + e.getMessage());
    } //catch
  } //main
}
```

### 4.4.11 Attributions and Bylines 归属与署名

```java
/* Added by Rick */
```

Source code control systems are very good at remembering who added what, when. There is no need to pollute the code with little bylines. You might think that such comments would be useful in order to help others know who to talk to about the code. But the reality is that they tend to stay around for years and years, getting less and less accurate and relevant.

> 源代码控制系统非常善于记住是谁在何时添加了什么。没必要用那些小小的签名搞脏代码。你也许会认为，这种注释大概有助于他人了解应该和谁讨论这段代码。不过，事实却是注释在那儿放了一年又一年，越来越不准确，越来越和原作者没关系。

Again, the source code control system is a better place for this kind of information.

> 重申一下，源代码控制系统是这类信息最好的归属地。

### 4.4.12 Commented-Out Code 注释掉的代码

Few practices are as odious as commenting-out code. Don’t do this!

> 直接把代码注释掉是讨厌的做法。别这么干！

```java
  InputStreamResponse response = new InputStreamResponse();
  response.setBody(formatter.getResultStream(), formatter.getByteCount());
// InputStream resultsStream = formatter.getResultStream();
// StreamReader reader = new StreamReader(resultsStream);
// response.setContent(reader.read(formatter.getByteCount()));
```

Others who see that commented-out code won’t have the courage to delete it. They’ll think it is there for a reason and is too important to delete. So commented-out code gathers like dregs at the bottom of a bad bottle of wine.

> 其他人不敢删除注释掉的代码。他们会想，代码依然放在那儿，一定有其原因，而且这段代码很重要，不能删除。注释掉的代码堆积在一起，就像破酒瓶底的渣滓一般。

Consider this from apache commons:

> 看看以下来自 Apache 公共库的代码：

```java
this.bytePos = writeBytes(pngIdBytes, 0);
//hdrPos = bytePos;
writeHeader();
writeResolution();
//dataPos = bytePos;
if (writeImageData()) {
    writeEnd();
    this.pngBytes = resizeByteArray(this.pngBytes, this.maxPos);
}

else {
    this.pngBytes = null;
}
return this.pngBytes;
```

Why are those two lines of code commented? Are they important? Were they left as reminders for some imminent change? Or are they just cruft that someone commented-out years ago and has simply not bothered to clean up.

> 这两行代码为什么要注释掉？它们重要吗？它们搁在那儿，是为了给未来的修改做提示吗？或者，只是某人在多年以前注释掉、懒得清理的过时玩意？

There was a time, back in the sixties, when commenting-out code might have been useful. But we’ve had good source code control systems for a very long time now. Those systems will remember the code for us. We don’t have to comment it out any more. Just delete the code. We won’t lose it. Promise.

> 20 世纪 60 年代，曾经有那么一段时间，注释掉的代码可能有用。但我们已经拥有优良的源代码控制系统如此之久，这些系统可以为我们记住不要的代码。我们无需再用注释来标记，删掉即可，它们丢不了。我担保。

### 4.4.13 HTML Comments HTML 注释

HTML in source code comments is an abomination, as you can tell by reading the code below. It makes the comments hard to read in the one place where they should be easy to read—the editor/IDE. If comments are going to be extracted by some tool (like Javadoc) to appear in a Web page, then it should be the responsibility of that tool, and not the programmer, to adorn the comments with appropriate HTML.

> 源代码注释中的 HTML 标记是一种厌物，如你在下面代码中所见。编辑器/IDE 中的代码本来易于阅读，却因为 HTML 注释的存在而变得难以卒读。如果注释将由某种工具（例如 Javadoc）抽取出来，呈现到网页，那么该是工具而非程序员来负责给注释加上合适的 HTML 标签。

```java
/**
* Task to run fit tests.
* This task runs fitnesse tests and publishes the results.
* <p/>
* <pre>
* Usage:
* &lt;taskdef name=&quot;execute-fitnesse-tests&quot;
*     classname=&quot;fitnesse.ant.ExecuteFitnesseTestsTask&quot;
*     classpathref=&quot;classpath&quot; /&gt;
* OR
* &lt;taskdef classpathref=&quot;classpath&quot;
*             resource=&quot;tasks.properties&quot; /&gt;
* <p/>
* &lt;execute-fitnesse-tests
*     suitepage=&quot;FitNesse.SuiteAcceptanceTests&quot;
*     fitnesseport=&quot;8082&quot;
*     resultsdir=&quot;${results.dir}&quot;
*     resultshtmlpage=&quot;fit-results.html&quot;
*     classpathref=&quot;classpath&quot; /&gt;
* </pre>
*/
```

### 4.4.14 Nonlocal Information 非本地信息

If you must write a comment, then make sure it describes the code it appears near. Don’t offer systemwide information in the context of a local comment. Consider, for example, the javadoc comment below. Aside from the fact that it is horribly redundant, it also offers information about the default port. And yet the function has absolutely no control over what that default is. The comment is not describing the function, but some other, far distant part of the system. Of course there is no guarantee that this comment will be changed when the code containing the default is changed.

> 假如你一定要写注释，请确保它描述了离它最近的代码。别在本地注释的上下文环境中给出系统级的信息。以下面的 Javadoc 注释为例，除了那可怕的冗余之外，它还给出了有关默认端口的信息。不过该函数完全没控制到那个所谓默认值。这个注释并未描述该函数，而是在描述系统中远在他方的其他函数。当然，也无法担保在包含那个默认值的代码修改之后，这里的注释也会跟着修改。

```java
/**
* Port on which fitnesse would run. Defaults to 8082.
*
* @param fitnessePort
*/
public void setFitnessePort(int fitnessePort)
{
  this.fitnessePort = fitnessePort;
}
```

### 4.4.15 Too Much Information 信息过多

Don’t put interesting historical discussions or irrelevant descriptions of details into your comments. The comment below was extracted from a module designed to test that a function could encode and decode base64. Other than the RFC number, someone reading this code has no need for the arcane information contained in the comment.

> 别在注释中添加有趣的历史性话题或者无关的细节描述。下列注释来自某个用来测试 base64 编解码函数的模块。除了 RFC 文档编号之外，注释中的其他细节信息对于读者完全没有必要。

```java
/*
    RFC 2045 - Multipurpose Internet Mail Extensions (MIME)
    Part One: Format of Internet Message Bodies
    section 6.8.  Base64 Content-Transfer-Encoding
    The encoding process represents 24-bit groups of input bits as output
    strings of 4 encoded characters. Proceeding from left to right, a
    24-bit input group is formed by concatenating 3 8-bit input groups.
    These 24 bits are then treated as 4 concatenated 6-bit groups, each
    of which is translated into a single digit in the base64 alphabet.
    When encoding a bit stream via the base64 encoding, the bit stream
    must be presumed to be ordered with the most-significant-bit first.
    That is, the first bit in the stream will be the high-order bit in
    the first 8-bit byte, and the eighth bit will be the low-order bit in
    the first 8-bit byte, and so on.
  */
```

### 4.4.16 Inobvious Connection 不明显的联系

The connection between a comment and the code it describes should be obvious. If you are going to the trouble to write a comment, then at least you’d like the reader to be able to look at the comment and the code and understand what the comment is talking about.

> 注释及其描述的代码之间的联系应该显而易见。如果你不嫌麻烦要写注释，至少让读者能看着注释和代码，并且理解注释所谈何物。

Consider, for example, this comment drawn from apache commons:

> 以来自 Apache 公共库的这段注释为例：

```java
   /*
    * start with an array that is big enough to hold all the pixels
    * (plus filter bytes), and an extra 200 bytes for header info
    */
   this.pngBytes = new byte[((this.width + 1) * this.height * 3) + 200];
```

What is a filter byte? Does it relate to the +1? Or to the \*3? Both? Is a pixel a byte? Why 200? The purpose of a comment is to explain code that does not explain itself. It is a pity when a comment needs its own explanation.

> 过滤器字节是什么？与那个+1 有关系吗？或与\*3 有关？还是与两者皆有关？为什么用 200？注释的作用是解释未能自行解释的代码。如果注释本身还需要解释，就太遗憾了。

### 4.4.17 Function Headers 函数头

Short functions don’t need much description. A well-chosen name for a small function that does one thing is usually better than a comment header.

> 短函数不需要太多描述。为只做一件事的短函数选个好名字，通常要比写函数头注释要好。

### 4.4.18 Javadocs in Nonpublic Code 非公共代码中的 Javadoc

As useful as javadocs are for public APIs, they are anathema to code that is not intended for public consumption. Generating javadoc pages for the classes and functions inside a system is not generally useful, and the extra formality of the javadoc comments amounts to little more than cruft and distraction.

> 虽然 Javadoc 对于公共 API 非常有用，但对于不打算作公共用途的代码就令人厌恶了。为系统中的类和函数生成 Javadoc 页并非总有用，而 Javadoc 注释额外的形式要求几乎等同于八股文章。

### 4.4.19 Example 范例

I wrote the module in Listing 4-7 for the first XP Immersion. It was intended to be an example of bad coding and commenting style. Kent Beck then refactored this code into a much more pleasant form in front of several dozen enthusiastic students. Later I adapted the example for my book Agile Software Development, Principles, Patterns, and Practices and the first of my Craftsman articles published in Software Development magazine.

> 我曾为首个 XP Immersion[4]课程编写了代码清单 4-7 列出的模块。这个模块几乎是糟糕的代码和坏注释风格的典范。后来 Kent Beck 当着几十位满腔热情的学生的面重构了这些代码，将其变得令人愉悦。后来，我在拙著 Agile Software Development，Principles，Patterns，and Practices（中译版《敏捷软件开发：原则、模式与实践》）和 Software Development（软件开发）杂志的“技艺”专栏的第一篇文章中引用了这个例子。

What I find fascinating about this module is that there was a time when many of us would have considered it “well documented.” Now we see it as a small mess. See how many different comment problems you can find.

> 这个模块最迷人的地方是，有那么一阵，我们中的许多人都认为它“文档做得很好”。如今，我们认为它是一小团乱麻。看看你能发现多少个不同的注释问题吧。

Listing 4-7 GeneratePrimes.java

> 代码清单 4-7 GeneratePrimes.java

```java
/**
* This class Generates prime numbers up to a user specified
* maximum.  The algorithm used is the Sieve of Eratosthenes.
* <p>
* Eratosthenes of Cyrene, b. c. 276 BC, Cyrene, Libya --
* d. c. 194, Alexandria.  The first man to calculate the
* circumference of the Earth.  Also known for working on
* calendars with leap years and ran the library at Alexandria.
* <p>
* The algorithm is quite simple.  Given an array of integers
* starting at 2.  Cross out all multiples of 2.  Find the next
* uncrossed integer, and cross out all of its multiples.
* Repeat untilyou have passed the square root of the maximum
* value.
*
* @author Alphonse
* @version 13 Feb 2002 atp
*/
import java.util.*;

public class GeneratePrimes
{
  /**
  * @param maxValue is the generation limit.
  */
  public static int[] generatePrimes(int maxValue)
  {
    if (maxValue >= 2) // the only valid case
    {
      // declarations
      int s = maxValue + 1; // size of array
      boolean[] f = new boolean[s];
      int i;
      // initialize array to true.
      for (i = 0; i < s; i++)
        f[i] = true;

      // get rid of known non-primes
      f[0] = f[1] = false;

      // sieve
      int j;
      for (i = 2; i < Math.sqrt(s) + 1; i++)
      {
        if (f[i]) // if i is uncrossed, cross its multiples.
        {
          for (j = 2 * i; j < s; j += i)
            f[j] = false; // multiple is not prime
        }
      }

      // how many primes are there?
      int count = 0;
      for (i = 0; i < s; i++)
      {
        if (f[i])
          count++; // bump count.
      }

      int[] primes = new int[count];

      // move the primes into the result
      for (i = 0, j = 0; i < s; i++)
      {
        if (f[i])  // if prime
          primes[j++] = i;
      }

      return primes;  // return the primes
    }
    else // maxValue < 2
      return new int[0]; // return null array if bad input.
  }
}
```

In Listing 4-8 you can see a refactored version of the same module. Note that the use of comments is significantly restrained. There are just two comments in the whole module. Both comments are explanatory in nature.

> 在代码清单 4-8 中，你可以看到该模块重构后的版本。注意，注释的使用被明显地限制了。在整个模块中只有两个注释。每个注释都足具说明意义。

Listing 4-8 PrimeGenerator.java (refactored)

> 代码清单 4-8 PrimeGenerator.java（重构后）

```java
/**
* This class Generates prime numbers up to a user specified
* maximum.  The algorithm used is the Sieve of Eratosthenes.
* Given an array of integers starting at 2:
* Find the first uncrossed integer, and cross out all its
* multiples.  Repeat until there are no more multiples
* in the array.
*/

public class PrimeGenerator
{
  private static boolean[] crossedOut;
  private static int[] result;

  public static int[] generatePrimes(int maxValue)
  {
    if (maxValue < 2)
      return new int[0];
    else
    {
      uncrossIntegersUpTo(maxValue);
      crossOutMultiples();
      putUncrossedIntegersIntoResult();
      return result;
    }
  }

  private static void uncrossIntegersUpTo(int maxValue)
  {
    crossedOut = new boolean[maxValue + 1];
    for (int i = 2; i < crossedOut.length; i++)
      crossedOut[i] = false;
  }

  private static void crossOutMultiples()
  {
    int limit = determineIterationLimit();
    for (int i = 2; i <= limit; i++)
      if (notCrossed(i))
        crossOutMultiplesOf(i);
  }

  private static int determineIterationLimit()
  {
    // Every multiple in the array has a prime factor that
    // is less than or equal to the root of the array size,
    // so we don’t have to cross out multiples of numbers
    // larger than that root.
    double iterationLimit = Math.sqrt(crossedOut.length);
    return (int) iterationLimit;
  }

  private static void crossOutMultiplesOf(int i)
  {
    for (int multiple = 2*i;
        multiple < crossedOut.length;
        multiple += i)
      crossedOut[multiple] = true;
  }

  private static boolean notCrossed(int i)
  {
    return crossedOut[i] == false;
  }

  private static void putUncrossedIntegersIntoResult()
  {
    result = new int[numberOfUncrossedIntegers()];
    for (int j = 0, i = 2; i < crossedOut.length; i++)
      if (notCrossed(i))
        result[j++] = i;
  }

  private static int numberOfUncrossedIntegers()
  {
    int count = 0;
    for (int i = 2; i < crossedOut.length; i++)
      if (notCrossed(i))
        count++;

    return count;
  }
}
```

It is easy to argue that the first comment is redundant because it reads very much like the generatePrimes function itself. Still, I think the comment serves to ease the reader into the algorithm, so I’m inclined to leave it.

> 很容易说明，第一个注释完全是多余的，因为它读起来非常像是 generatePrimes 函数自身。不过，我认为这段注释还是省了读者去读具体算法的精力，所以我倾向于留下它。

The second argument is almost certainly necessary. It explains the rationale behind the use of the square root as the loop limit. I could find no simple variable name, nor any different coding structure that made this point clear. On the other hand, the use of the square root might be a conceit. Am I really saving that much time by limiting the iteration to the square root? Could the calculation of the square root take more time than I’m saving?

> 第二个注释显然很有必要。它解释了平方根作为循环限制的理由。我找不到能说明白这个问题的简单变量名或者其他编程结构。另外，对平方根的使用可能也有点武断。通过限制平方根循环，我是否真节省了许多时间？平方根计算所花的时间会不会比省下的时间还要多？

It’s worth thinking about. Using the square root as the iteration limit satisfies the old C and assembly language hacker in me, but I’m not convinced it’s worth the time and effort that everyone else will expend to understand it.

> 这些都值得考虑。使用平方根作为循环限制，满足了我这种旧式 C 语言和汇编语言黑客，不过我可不敢说抵得上其他人为理解它而花的时间和精力。
