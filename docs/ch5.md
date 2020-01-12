# 第 5 章 Formatting 格式

![](figures/ch5/5_1fig_martin.jpg)

When people look under the hood, we want them to be impressed with the neatness, consistency, and attention to detail that they perceive. We want them to be struck by the orderliness. We want their eyebrows to rise as they scroll through the modules. We want them to perceive that professionals have been at work. If instead they see a scrambled mass of code that looks like it was written by a bevy of drunken sailors, then they are likely to conclude that the same inattention to detail pervades every other aspect of the project.

> 当有人查看底层代码实现时，我们希望他们为其整洁、一致及所感知到的对细节的关注而震惊。我们希望他们高高扬起眉毛，一路看下去。我们希望他们感受到那些为之劳作的专业人士们。但若他们看到的只是一堆像是由酒醉的水手写出的鬼画符，那他们多半会得出结论，认为项目其他任何部分也同样对细节漠不关心。

You should take care that your code is nicely formatted. You should choose a set of simple rules that govern the format of your code, and then you should consistently apply those rules. If you are working on a team, then the team should agree to a single set of formatting rules and all members should comply. It helps to have an automated tool that can apply those formatting rules for you.

> 当有人查看底层代码实现时，我们希望他们为其整洁、一致及所感知到的对细节的关注而震惊。我们希望他们高高扬起眉毛，一路看下去。我们希望他们感受到那些为之劳作的专业人士们。但若他们看到的只是一堆像是由酒醉的水手写出的鬼画符，那他们多半会得出结论，认为项目其他任何部分也同样对细节漠不关心。

## 5.1 THE PURPOSE OF FORMATTING 格式的目的

First of all, let’s be clear. Code formatting is important. It is too important to ignore and it is too important to treat religiously. Code formatting is about communication, and communication is the professional developer’s first order of business.

> 先明确一下，代码格式很重要。代码格式不可忽略，必须严肃对待。代码格式关乎沟通，而沟通是专业开发者的头等大事。

Perhaps you thought that “getting it working” was the first order of business for a professional developer. I hope by now, however, that this book has disabused you of that idea. The functionality that you create today has a good chance of changing in the next release, but the readability of your code will have a profound effect on all the changes that will ever be made. The coding style and readability set precedents that continue to affect maintainability and extensibility long after the original code has been changed beyond recognition. Your style and discipline survives, even though your code does not.

> 或许你认为“让代码能工作”才是专业开发者的头等大事。然而，我希望本书能让你抛掉那种想法。你今天编写的功能，极有可能在下一版本中被修改，但代码的可读性却会对以后可能发生的修改行为产生深远影响。原始代码修改之后很久，其代码风格和可读性仍会影响到可维护性和扩展性。即便代码已不复存在，你的风格和律条仍存活下来。

So what are the formatting issues that help us to communicate best?

> 那么，哪些代码格式相关方面能帮我们最好地沟通呢？

## 5.2 VERTICAL FORMATTING 垂直格式

Let’s start with vertical size. How big should a source file be? In Java, file size is closely related to class size. We’ll talk about class size when we talk about classes. For the moment let’s just consider file size.

> 从垂直尺寸开始吧。源代码文件该有多大？在 Java 中，文件尺寸与类尺寸极其相关。讨论类时再说类的尺寸。现在先考虑文件尺寸。

How big are most Java source files? It turns out that there is a huge range of sizes and some remarkable differences in style. Figure 5-1 shows some of those differences.

> 多数 Java 源代码文件有多大？事实说明，尺寸各各不同，长度殊异，如图 5-1 所示。

Seven different projects are depicted. Junit, FitNesse, testNG, Time and Money, JDepend, Ant, and Tomcat. The lines through the boxes show the minimum and maximum file lengths in each project. The box shows approximately one-third (one standard deviation1) of the files. The middle of the box is the mean. So the average file size in the FitNesse project is about 65 lines, and about one-third of the files are between 40 and 100+ lines. The largest file in FitNesse is about 400 lines and the smallest is 6 lines. Note that this is a log scale, so the small difference in vertical position implies a very large difference in absolute size.

> 图 5-1 中涉及 7 个不同项目：Junit、FitNesse、testNG、Time and Money、JDepend、Ant 和 Tomcat。贯穿方块的直线两端显示这些项目中最小和最大的文件长度。方块表示在平均值以上或以下的大约三分之一文件（一个标准偏差[1]）的长度。方块中间位置就是平均数。所以 FitNesse 项目的文件平均尺寸是 65 行，而上面三分之一在 40 ～ 100 行及 100 行以上之间。FitNesse 中最大的文件大约 400 行，最小是 6 行。这是个对数标尺，所以较小的垂直位置差异意味着文件绝对尺寸的较大差异。

1. The box shows sigma/2 above and below the mean. Yes, I know that the file length distribution is not normal, and so the standard deviation is not mathematically precise. But we’re not trying for precision here. We’re just trying to get a feel.

Figure 5-1 File length distributions LOG scale (box height = sigma)

![](figures/ch5/5_2fig_martin.jpg)

Junit, FitNesse, and Time and Money are composed of relatively small files. None are over 500 lines and most of those files are less than 200 lines. Tomcat and Ant, on the other hand, have some files that are several thousand lines long and close to half are over 200 lines.

> Junit、FitNesse 和 Time and Money 由相对较小的文件组成。没有一个超过 500 行，多数都小于 200 行。Tomcat 和 Ant 则有些文件达到数千行，将近一半文件长于 200 行。

What does that mean to us? It appears to be possible to build significant systems (FitNesse is close to 50,000 lines) out of files that are typically 200 lines long, with an upper limit of 500. Although this should not be a hard and fast rule, it should be considered very desirable. Small files are usually easier to understand than large files are.

> 对我们来说，这意味着什么？意味着有可能用大多数为 200 行、最长 500 行的单个文件构造出色的系统（FitNesse 总长约 50000 行）。尽管这并非不可违背的原则，也应该乐于接受。短文件通常比长文件易于理解。

### 5.2.1 The Newspaper Metaphor 向报纸学习

Think of a well-written newspaper article. You read it vertically. At the top you expect a headline that will tell you what the story is about and allows you to decide whether it is something you want to read. The first paragraph gives you a synopsis of the whole story, hiding all the details while giving you the broad-brush concepts. As you continue downward, the details increase until you have all the dates, names, quotes, claims, and other minutia.

> 想想看写得很好的报纸文章。你从上到下阅读。在顶部，你期望有个头条，告诉你故事主题，好让你决定是否要读下去。第一段是整个故事的大纲，给出粗线条概述，但隐藏了故事细节。接着读下去，细节渐次增加，直至你了解所有的日期、名字、引语、说法及其他细节。

We would like a source file to be like a newspaper article. The name should be simple but explanatory. The name, by itself, should be sufficient to tell us whether we are in the right module or not. The topmost parts of the source file should provide the high-level concepts and algorithms. Detail should increase as we move downward, until at the end we find the lowest level functions and details in the source file.

> 源文件也要像报纸文章那样。名称应当简单且一目了然。名称本身应该足够告诉我们是否在正确的模块中。源文件最顶部应该给出高层次概念和算法。细节应该往下渐次展开，直至找到源文件中最底层的函数和细节。

A newspaper is composed of many articles; most are very small. Some are a bit larger. Very few contain as much text as a page can hold. This makes the newspaper usable. If the newspaper were just one long story containing a disorganized agglomeration of facts, dates, and names, then we simply would not read it.

> 报纸由许多篇文章组成；多数短小精悍。有些稍微长点儿。很少有占满一整页的。这样做，报纸才可用。假若一份报纸只登载一篇长故事，其中充斥毫无组织的事实、日期、名字等，没人会去读它。

### 5.2.2 Vertical Openness Between Concepts 概念间垂直方向上的区隔

Nearly all code is read left to right and top to bottom. Each line represents an expression or a clause, and each group of lines represents a complete thought. Those thoughts should be separated from each other with blank lines.

> 几乎所有的代码都是从上往下读，从左往右读。每行展现一个表达式或一个子句，每组代码行展示一条完整的思路。这些思路用空白行区隔开来。

Consider, for example, Listing 5-1. There are blank lines that separate the package declaration, the import(s), and each of the functions. This extremely simple rule has a profound effect on the visual layout of the code. Each blank line is a visual cue that identifies a new and separate concept. As you scan down the listing, your eye is drawn to the first line that follows a blank line.

> 以代码清单 5-1 为例。在封包声明、导入声明和每个函数之间，都有空白行隔开。这条极其简单的规则极大地影响到代码的视觉外观。每个空白行都是一条线索，标识出新的独立概念。往下读代码时，你的目光总会停留于空白行之后那一行。

Listing 5-1 BoldWidget.java

> 代码清单 5-1 BoldWidget.java

```java
package fitnesse.wikitext.widgets;

import java.util.regex.*;

public class BoldWidget extends ParentWidget {
  public static final String REGEXP = “’’’.+?’’’”;
  private static final Pattern pattern = Pattern.compile(“’’’(.+?)’’’”,
    Pattern.MULTILINE + Pattern.DOTALL
  );

  public BoldWidget(ParentWidget parent, String text) throws Exception {
    super(parent);
    Matcher match = pattern.matcher(text);
    match.find();
    addChildWidgets(match.group(1));
  }

  public String render() throws Exception {
    StringBuffer html = new StringBuffer(“<b>”);
    html.append(childHtml()).append(“</b>”);
    return html.toString();
  }

}
```

Taking those blank lines out, as in Listing 5-2, has a remarkably obscuring effect on the readability of the code.

> 如代码清单 5-2 所示，抽掉这些空白行，代码可读性减弱了不少。

Listing 5-2 BoldWidget.java

> 代码清单 5-2 BoldWidget.java

```java
package fitnesse.wikitext.widgets;
import java.util.regex.*;
public class BoldWidget extends ParentWidget {
  public static final String REGEXP = “’’’.+?’’’”;
  private static final Pattern pattern = Pattern.compile(“’’’(.+?)’’’”,
    Pattern.MULTILINE + Pattern.DOTALL);
  public BoldWidget(ParentWidget parent, String text) throws Exception {
    super(parent);
    Matcher match = pattern.matcher(text);
    match.find();
    addChildWidgets(match.group(1));}
  public String render() throws Exception {
    StringBuffer html = new StringBuffer(“<b>”);
    html.append(childHtml()).append(“</b>”);
    return html.toString();
  }
}
```

This effect is even more pronounced when you unfocus your eyes. In the first example the different groupings of lines pop out at you, whereas the second example looks like a muddle. The difference between these two listings is a bit of vertical openness.

> 在你不特意注视时，后果就更严重了。在第一个例子中，代码组会跳到你眼中，而第二个例子就像一堆乱麻。两段代码的区别，展示了垂直方向上区隔的作用。

### 5.2.3 Vertical Density 垂直方向上的靠近

If openness separates concepts, then vertical density implies close association. So lines of code that are tightly related should appear vertically dense. Notice how the useless comments in Listing 5-3 break the close association of the two instance variables.

> 如果说空白行隔开了概念，靠近的代码行则暗示了它们之间的紧密关系。所以，紧密相关的代码应该互相靠近。注意代码清单 5-3 中的注释是如何割断两个实体变量间的联系的。

Listing 5-3

> 代码清单 5-3

```java
public class ReporterConfig {

  /**
  * The class name of the reporter listener
  */
  private String m_className;

  /**
  * The properties of the reporter listener
  */
  private List<Property> m_properties = new ArrayList<Property>();

  public void addProperty(Property property) {
    m_properties.add(property);
  }
```

Listing 5-4 is much easier to read. It fits in an “eye-full,” or at least it does for me. I can look at it and see that this is a class with two variables and a method, without having to move my head or eyes much. The previous listing forces me to use much more eye and head motion to achieve the same level of comprehension.

> 代码清单 5-4 更易于阅读。它刚好“一览无遗”，至少对我来说是这样。我一眼就能看到，这是个有两个变量和一个方法的类。看上面的代码时，我不得不更多地移动头部和眼球，才能获得相同的理解度。

Listing 5-4

> 代码清单 5-4

```java
   public class ReporterConfig {
     private String m_className;
     private List<Property> m_properties = new ArrayList<Property>();

     public void addProperty(Property property) {
       m_properties.add(property);
     }
```

### 5.2.4 Vertical Distance 垂直距离

Have you ever chased your tail through a class, hopping from one function to the next, scrolling up and down the source file, trying to divine how the functions relate and operate, only to get lost in a rat’s nest of confusion? Have you ever hunted up the chain of inheritance for the definition of a variable or function? This is frustrating because you are trying to understand what the system does, but you are spending your time and mental energy on trying to locate and remember where the pieces are.

> 你是否曾经在某个类中摸索，从一个函数跳到另一个函数，上下求索，想要弄清楚这些函数如何操作、如何互相相关，最后却被搞糊涂了？你是否曾经苦苦追索某个变量或函数的继承链条？这让人沮丧，因为你想要理解系统做什么，但却花时间和精力在找到和记住那些代码碎片在哪里。

Concepts that are closely related should be kept vertically close to each other [G10]. Clearly this rule doesn’t work for concepts that belong in separate files. But then closely related concepts should not be separated into different files unless you have a very good reason. Indeed, this is one of the reasons that protected variables should be avoided.

> 关系密切的概念应该互相靠近[G10]。显然，这条规则并不适用于分布在不同文件中的概念。除非有很好的理由，否则就不要把关系密切的概念放到不同的文件中。实际上，这也是避免使用 protected 变量的理由之一。

For those concepts that are so closely related that they belong in the same source file, their vertical separation should be a measure of how important each is to the understandability of the other. We want to avoid forcing our readers to hop around through our source files and classes.

> 对于那些关系密切、放置于同一源文件中的概念，它们之间的区隔应该成为对相互的易懂度有多重要的衡量标准。应避免迫使读者在源文件和类中跳来跳去。

Variable Declarations. Variables should be declared as close to their usage as possible. Because our functions are very short, local variables should appear a the top of each function, as in this longish function from Junit4.3.1.

> 变量声明。变量声明应尽可能靠近其使用位置。因为函数很短，本地变量应该在函数的顶部出现，就像 Junit4.3.1 中这个稍长的函数中那样。

```java
private static void readPreferences() {
  InputStream is= null;
  try {
    is= new FileInputStream(getPreferencesFile());
    setPreferences(new Properties(getPreferences()));
    getPreferences().load(is);
  } catch (IOException e) {
    try {
      if (is != null)
        is.close();
    } catch (IOException e1) {
    }
  }
}
```

Control variables for loops should usually be declared within the loop statement, as in this cute little function from the same source.

> 对于那些关系密切、放置于同一源文件中的概念，它们之间的区隔应该成为对相互的易懂度有多重要的衡量标准。应避免迫使读者在源文件和类中跳来跳去。

```java
   public int countTestCases() {
     int count= 0;
     for (Test each : tests)
       count += each.countTestCases();
     return count;
   }
```

In rare cases a variable might be declared at the top of a block or just before a loop in a long-ish function. You can see such a variable in this snippet from the midst of a very long function in TestNG.

> 偶尔，在较长的函数中，变量也可能在某个代码块顶部，或在循环之前声明。你可以在以下摘自 TestNG 中一个长函数的代码片段中找到类似的变量。

```java
…
for (XmlTest test : m_suite.getTests()) {
      TestRunner tr = m_runnerFactory.newTestRunner(this, test);
      tr.addListener(m_textReporter);
      m_testRunners.add(tr);

    invoker = tr.getInvoker();

    for (ITestNGMethod m : tr.getBeforeSuiteMethods()) {
      beforeSuiteMethods.put(m.getMethod(), m);
    }

    for (ITestNGMethod m : tr.getAfterSuiteMethods()) {
      afterSuiteMethods.put(m.getMethod(), m);
    }
  }
…
```

Instance variables, on the other hand, should be declared at the top of the class. This should not increase the vertical distance of these variables, because in a well-designed class, they are used by many, if not all, of the methods of the class.

> 实体变量应该在类的顶部声明。这应该不会增加变量的垂直距离，因为在设计良好的类中，它们如果不是被该类的所有方法也是被大多数方法所用。

There have been many debates over where instance variables should go. In C++ we commonly practiced the so-called scissors rule, which put all the instance variables at the bottom. The common convention in Java, however, is to put them all at the top of the class. I see no reason to follow any other convention. The important thing is for the instance variables to be declared in one well-known place. Everybody should know where to go to see the declarations.

> 关于实体变量应该放在哪里，争论不断。在 C++中，通常会采用所谓“剪刀原则”（scissors rule），所有实体变量都放在底部。而在 Java 中，惯例是放在类的顶部。没理由去遵循其他惯例。重点是在谁都知道的地方声明实体变量。大家都应该知道在哪儿能看到这些声明。

Consider, for example, the strange case of the TestSuite class in JUnit 4.3.1. I have greatly attenuated this class to make the point. If you look about halfway down the listing, you will see two instance variables declared there. It would be hard to hide them in a better place. Someone reading this code would have to stumble across the declarations by accident (as I did).

> 例如 JUnit 4.3.1 中的这个奇怪情形。我极力删减了这个类，好说明问题。如果你看到代码清单大致一半的位置，会看到在那里声明了两个实体变量。如果放在更好的位置，它们就会更明显。而现在，读代码者只能在无意中看到这些声明（就像我一样）。

```java
public class TestSuite implements Test {
  static public Test createTest(Class<? extends TestCase> theClass,
                              String name)  {
    …
  }

  public static Constructor<? extends TestCase>
  getTestConstructor(Class<? extends TestCase> theClass)
  throws NoSuchMethodException {
    …
  }

  public static Test warning(final String message) {
    …
  }

  private static String exceptionToString(Throwable t) {
    …
  }

  private String fName;

  private Vector<Test> fTests= new Vector<Test>(10);

  public TestSuite() {
  }

  public TestSuite(final Class<? extends TestCase> theClass) {
    …
  }

  public TestSuite(Class<? extends TestCase>  theClass, String name) {
    …
  }
  … … … … …
}
```

Dependent Functions. If one function calls another, they should be vertically close, and the caller should be above the callee, if at all possible. This gives the program a natural flow. If the convention is followed reliably, readers will be able to trust that function definitions will follow shortly after their use. Consider, for example, the snippet from FitNesse in Listing 5-5. Notice how the topmost function calls those below it and how they in turn call those below them. This makes it easy to find the called functions and greatly enhances the readability of the whole module.

> 相关函数。若某个函数调用了另外一个，就应该把它们放到一起，而且调用者应该尽可能放在被调用者上面。这样，程序就有个自然的顺序。若坚定地遵循这条约定，读者将能够确信函数声明总会在其调用后很快出现。以源自 FitNesse 的代码清单 5-5 为例。注意顶部的函数是如何调用其下的函数，而这些被调用的函数又是如何调用更下面的函数的。这样就能轻易找到被调用的函数，极大地增强了整个模块的可读性。

Listing 5-5 WikiPageResponder.java

> 代码清单 5-5 WikiPageResponder.java

```java
public class WikiPageResponder implements SecureResponder {
  protected WikiPage page;
  protected PageData pageData;
  protected String pageTitle;
  protected Request request;
  protected PageCrawler crawler;

  public Response makeResponse(FitNesseContext context, Request request)
    throws Exception {
    String pageName = getPageNameOrDefault(request, “FrontPage”);
    loadPage(pageName, context);
    if (page == null)
      return notFoundResponse(context, request);
    else
      return makePageResponse(context);
  }

  private String getPageNameOrDefault(Request request, String defaultPageName)
  {
    String pageName = request.getResource();
    if (StringUtil.isBlank(pageName))
      pageName = defaultPageName;

    return pageName;
  }

  protected void loadPage(String resource, FitNesseContext context)
    throws Exception {
    WikiPagePath path = PathParser.parse(resource);
    crawler = context.root.getPageCrawler();
    crawler.setDeadEndStrategy(new VirtualEnabledPageCrawler());
    page = crawler.getPage(context.root, path);
    if (page != null)
      pageData = page.getData();
  }

  private Response notFoundResponse(FitNesseContext context, Request request)
    throws Exception {
    return new NotFoundResponder().makeResponse(context, request);
  }

  private SimpleResponse makePageResponse(FitNesseContext context)
    throws Exception {
    pageTitle = PathParser.render(crawler.getFullPath(page));
    String html = makeHtml(context);

    SimpleResponse response = new SimpleResponse();
    response.setMaxAge(0);
    response.setContent(html);
    return response;
  }
…
```

As an aside, this snippet provides a nice example of keeping constants at the appropriate level [G35]. The “FrontPage” constant could have been buried in the getPageNameOrDefault function, but that would have hidden a well-known and expected constant in an inappropriately low-level function. It was better to pass that constant down from the place where it makes sense to know it to the place that actually uses it.

> 说句题外话，以上代码片段也是把常量保持在恰当级别的好例子[G35]。FrontPage 常量可以埋在 getPageNameOrDefault 函数中，但那样就会把一个众人皆知的常量埋藏到位于不太合适的底层函数中。更好的做法是把它放在易于找到的位置，然后再传递到真实使用的位置。

Conceptual Affinity. Certain bits of code want to be near other bits. They have a certain conceptual affinity. The stronger that affinity, the less vertical distance there should be between them.

> 概念相关。概念相关的代码应该放到一起。相关性越强，彼此之间的距离就该越短。

As we have seen, this affinity might be based on a direct dependence, such as one function calling another, or a function using a variable. But there are other possible causes of affinity. Affinity might be caused because a group of functions perform a similar operation. Consider this snippet of code from Junit 4.3.1:

> 如上所述，相关性应建立在直接依赖的基础上，如函数间调用，或函数使用某个变量。但也有其他相关性的可能。相关性可能来自于执行相似操作的一组函数。请看以下来自 Junit 4.3.1 的代码片段：

![](figures/ch5/5_3fig_martin.jpg)

```java
public class Assert {
  static public void assertTrue(String message, boolean condition) {
    if (!condition)
      fail(message);
  }

  static public void assertTrue(boolean condition) {
    assertTrue(null, condition);
  }

  static public void assertFalse(String message, boolean condition) {
    assertTrue(message, !condition);
  }

  static public void assertFalse(boolean condition) {
    assertFalse(null, condition);
  }
…
```

These functions have a strong conceptual affinity because they share a common naming scheme and perform variations of the same basic task. The fact that they call each other is secondary. Even if they didn’t, they would still want to be close together.

这些函数有着极强的概念相关性，因为他们拥有共同的命名模式，执行同一基础任务的不同变种。互相调用是第二位的。即便没有互相调用，也应该放在一起。

### 5.2.5 Vertical Ordering 垂直顺序

In general we want function call dependencies to point in the downward direction. That is, a function that is called should be below a function that does the calling.2 This creates a nice flow down the source code module from high level to low level.

> 一般而言，我们想自上向下展示函数调用依赖顺序。也就是说，被调用的函数应该放在执行调用的函数下面[2]。这样就建立了一种自顶向下贯穿源代码模块的良好信息流。

2. This is the exact opposite of languages like Pascal, C, and C++ that enforce functions to be defined, or at least declared, before they are used.

As in newspaper articles, we expect the most important concepts to come first, and we expect them to be expressed with the least amount of polluting detail. We expect the low-level details to come last. This allows us to skim source files, getting the gist from the first few functions, without having to immerse ourselves in the details. Listing 5-5 is organized this way. Perhaps even better examples are Listing 15-5 on page 263, and Listing 3-7 on page 50.

> 像报纸文章一般，我们指望最重要的概念先出来，指望以包括最少细节的方式表述它们。我们指望底层细节最后出来。这样，我们就能扫过源代码文件，自最前面的几个函数获知要旨，而不至于沉溺到细节中。代码清单 5-5 就是如此组织的。或许，更好的例子是代码清单 15-5，及代码清单 3-7。

## 5.3 HORIZONTAL FORMATTING 横向格式

How wide should a line be? To answer that, let’s look at how wide lines are in typical programs. Again, we examine the seven different projects. Figure 5-2 shows the distribution of line lengths of all seven projects. The regularity is impressive, especially right around 45 characters. Indeed, every size from 20 to 60 represents about 1 percent of the total number of lines. That’s 40 percent! Perhaps another 30 percent are less than 10 characters wide. Remember this is a log scale, so the linear appearance of the drop-off above 80 characters is really very significant. Programmers clearly prefer short lines.

> 一行代码应该有多宽？要回答这个问题，来看看典型的程序中代码行的宽度。我们再一次检验 7 个不同项目。图 5-2 展示了这 7 个项目的代码行宽度分布情况。其中展现的规律性令人印象深刻，45 个字符左右的宽度分布尤为如此。其实，20 ～ 60 的每个尺寸，都代表全部代码行数的 1%。也就是总共 40%！或许其余 30%的代码行短于 10 个字符。记住，这是个对数标尺，所以图中长于 80 个字符部分的线性下降在实际情况中会极其可观。程序员们显然更喜爱短代码行。

Figure 5-2 Java line width distribution

![](figures/ch5/5_4fig_martin.jpg)

This suggests that we should strive to keep our lines short. The old Hollerith limit of 80 is a bit arbitrary, and I’m not opposed to lines edging out to 100 or even 120. But beyond that is probably just careless.

> 这说明，应该尽力保持代码行短小。死守 80 个字符的上限有点僵化，而且我也并不反对代码行长度达到 100 个字符或 120 个字符。再多的话，大抵就是肆意妄为了。

I used to follow the rule that you should never have to scroll to the right. But monitors are too wide for that nowadays, and younger programmers can shrink the font so small that they can get 200 characters across the screen. Don’t do that. I personally set my limit at 120.

> 我一向遵循无需拖动滚动条到右边的原则。但近年来显示器越来越宽，而年轻程序员又能将显示字符缩小到如此程度，屏幕上甚至能容纳 200 个字符的宽度。别那么做。我个人的上限是 120 个字符。

### 5.3.1 Horizontal Openness and Density 水平方向上的区隔与靠近

We use horizontal white space to associate things that are strongly related and disassociate things that are more weakly related. Consider the following function:

> 我们使用空格字符将彼此紧密相关的事物连接到一起，也用空格字符把相关性较弱的事物分隔开。请看以下函数：

```java
private void measureLine(String line) {
  lineCount++;
  int lineSize = line.length();
  totalChars += lineSize;
  lineWidthHistogram.addLine(lineSize, lineCount);
  recordWidestLine(lineSize);
}
```

I surrounded the assignment operators with white space to accentuate them. Assignment statements have two distinct and major elements: the left side and the right side. The spaces make that separation obvious.

> 我在赋值操作符周围加上空格字符，以此达到强调目的。赋值语句有两个确定而重要的要素：左边和右边。空格字符加强了分隔效果。

On the other hand, I didn’t put spaces between the function names and the opening parenthesis. This is because the function and its arguments are closely related. Separating them makes them appear disjoined instead of conjoined. I separate arguments within the function call parenthesis to accentuate the comma and show that the arguments are separate.

> 另一方面，我不在函数名和左圆括号之间加空格。这是因为函数与其参数密切相关，如果隔开，就会显得互无关系。我把函数调用括号中的参数一一隔开，强调逗号，表示参数是互相分离的。

Another use for white space is to accentuate the precedence of operators.

> 空格字符的另一种用法是强调其前面的运算符。

```java
public class Quadratic {
  public static double root1(double a, double b, double c) {
    double determinant = determinant(a, b, c);
    return (-b + Math.sqrt(determinant)) / (2*a);
  }

  public static double root2(int a, int b, int c) {
    double determinant = determinant(a, b, c);
    return (-b - Math.sqrt(determinant)) / (2*a);
  }

  private static double determinant(double a, double b, double c) {
    return b*b - 4*a*c;
  }
}
```

Notice how nicely the equations read. The factors have no white space between them because they are high precedence. The terms are separated by white space because addition and subtraction are lower precedence.

> 看看这些等式读起来多舒服。乘法因子之间没加空格，因为它们具有较高优先级。加减法运算项之间用空格隔开，因为加法和减法优先级较低。

Unfortunately, most tools for reformatting code are blind to the precedence of operators and impose the same spacing throughout. So subtle spacings like those shown above tend to get lost after you reformat the code.

> 不幸的是，多数代码格式化工具都会漠视运算符优先级，从头到尾采用同样的空格方式。在重新格式化代码后，以上这些微妙的空格用法就消失殆尽了。

### 5.3.2 Horizontal Alignment 水平对齐

When I was an assembly language programmer,3 I used horizontal alignment to accentuate certain structures. When I started coding in C, C++, and eventually Java, I continued to try to line up all the variable names in a set of declarations, or all the rvalues in a set of assignment statements. My code might have looked like this:

> 当我还是个汇编语言程序员时[3]，使用水平对齐来强调某些程序结构。开始用 C、C++编码，最终转向 Java 后，我继续尽力对齐一组声明中的变量名，或一组赋值语句中的右值。我的代码看起来大概是这样：

3. Who am I kidding? I still am an assembly language programmer. You can take the boy away from the metal, but you can’t take the metal out of the boy!

```java
public class FitNesseExpediter implements ResponseSender
{
  private   Socket           socket;
  private   InputStream     input;
  private   OutputStream     output;
  private   Request         request;
  private   Response         response;
  private   FitNesseContext context;
  protected long            requestParsingTimeLimit;
  private   long            requestProgress;
  private   long            requestParsingDeadline;
  private   boolean          hasError;

  public FitNesseExpediter(Socket          s,
                          FitNesseContext context) throws Exception
  {
    this.context =            context;
    socket =                  s;
    input =                   s.getInputStream();
    output =                  s.getOutputStream();
    requestParsingTimeLimit = 10000;
  }
```

I have found, however, that this kind of alignment is not useful. The alignment seems to emphasize the wrong things and leads my eye away from the true intent. For example, in the list of declarations above you are tempted to read down the list of variable names without looking at their types. Likewise, in the list of assignment statements you are tempted to look down the list of rvalues without ever seeing the assignment operator. To make matters worse, automatic reformatting tools usually eliminate this kind of alignment.

> 我发现这种对齐方式没什么用。对齐，像是在强调不重要的东西，把我的目光从真正的意义上拉开。例如，在上面的声明列表中，你会从上到下阅读变量名，而忽视了它们的类型。同样，在赋值语句代码清单中，你也会从上到下阅读右值，而对赋值运算符视而不见。更麻烦的是，代码自动格式化工具通常会把这类对齐消除掉。

So, in the end, I don’t do this kind of thing anymore. Nowadays I prefer unaligned declarations and assignments, as shown below, because they point out an important deficiency. If I have long lists that need to be aligned, the problem is the length of the lists, not the lack of alignment. The length of the list of declarations in FitNesseExpediter below suggests that this class should be split up.

> 所以，我最终放弃了这种做法。如今，我更喜欢用不对齐的声明和赋值，如下所示，因为它们指出了重点。如果有较长的列表需要做对齐处理，那问题就是在列表的长度上而不是对齐上。下例 FitNesseExpediter 类中声明列表的长度说明该类应该被拆分了。

```java
public class FitNesseExpediter implements ResponseSender
{
  private Socket socket;
  private InputStream input;
  private OutputStream output;
  private Request request;

  private Response response;
  private FitNesseContext context;
  protected long requestParsingTimeLimit;
  private long requestProgress;
  private long requestParsingDeadline;
  private boolean hasError;

  public FitNesseExpediter(Socket s, FitNesseContext context) throws Exception
  {
    this.context = context;
    socket = s;
    input = s.getInputStream();
    output = s.getOutputStream();
    requestParsingTimeLimit = 10000;
  }
```

### 5.3.3 Indentation 缩进

A source file is a hierarchy rather like an outline. There is information that pertains to the file as a whole, to the individual classes within the file, to the methods within the classes, to the blocks within the methods, and recursively to the blocks within the blocks. Each level of this hierarchy is a scope into which names can be declared and in which declarations and executable statements are interpreted.

> 源文件是一种继承结构，而不是一种大纲结构。其中的信息涉及整个文件、文件中每个类、类中的方法、方法中的代码块，也涉及代码块中的代码块。这种继承结构中的每一层级都圈出一个范围，名称可以在其中声明，而声明和执行语句也可以在其中解释。

To make this hierarchy of scopes visible, we indent the lines of source code in proportion to their position in the hiearchy. Statements at the level of the file, such as most class declarations, are not indented at all. Methods within a class are indented one level to the right of the class. Implementations of those methods are implemented one level to the right of the method declaration. Block implementations are implemented one level to the right of their containing block, and so on.

> 要让这种范围式继承结构可见，我们依源代码行在继承结构中的位置对源代码行做缩进处理。在文件顶层的语句，例如大多数的类声明，根本不缩进。类中的方法相对该类缩进一个层级。方法的实现相对方法声明缩进一个层级。代码块的实现相对于其容器代码块缩进一个层级，以此类推。

Programmers rely heavily on this indentation scheme. They visually line up lines on the left to see what scope they appear in. This allows them to quickly hop over scopes, such as implementations of if or while statements, that are not relevant to their current situation. They scan the left for new method declarations, new variables, and even new classes. Without indentation, programs would be virtually unreadable by humans.

> 程序员相当依赖这种缩进模式。他们从代码行左边查看自己在什么范围中工作。这让他们能快速跳过与当前关注的情形无关的范围，例如 if 或 while 语句的实现之类。他们的眼光扫过左边，查找新的方法声明、新变量，甚至新类。没有缩进的话，程序就会变得无法阅读。

Consider the following programs that are syntactically and semantically identical:

> 试看以下在语法和语义上等价的两个程序：

```java
public class FitNesseServer implements SocketServer { private FitNesseContext
context; public FitNesseServer(FitNesseContext context) { this.context =
context; } public void serve(Socket s) { serve(s, 10000); } public void
serve(Socket s, long requestTimeout) { try { FitNesseExpediter sender = new
FitNesseExpediter(s, context);
sender.setRequestParsingTimeLimit(requestTimeout); sender.start(); }
catch(Exception e) { e.printStackTrace(); } } }

-----


public class FitNesseServer implements SocketServer {
  private FitNesseContext context;


public FitNesseServer(FitNesseContext context) {
  this.context = context;
}

public void serve(Socket s) {
  serve(s, 10000);
}

public void serve(Socket s, long requestTimeout) {
  try {
    FitNesseExpediter sender = new FitNesseExpediter(s, context);
    sender.setRequestParsingTimeLimit(requestTimeout);
    sender.start();
  }
  catch (Exception e) {
    e.printStackTrace();
  }
}
}
```

Your eye can rapidly discern the structure of the indented file. You can almost instantly spot the variables, constructors, accessors, and methods. It takes just a few seconds to realize that this is some kind of simple front end to a socket, with a time-out. The unindented version, however, is virtually impenetrable without intense study.

> 你能很快地洞悉有缩进的那个文件的结构。你几乎能立即就辨别出那些变量、构造器、存取器和方法。只需要几秒钟就能了解这是一个套接字的简单前端，其中包括了超时设定。而未缩进的版本则不经过一番折腾就无法明白。

Breaking Indentation. It is sometimes tempting to break the indentation rule for short if statements, short while loops, or short functions. Whenever I have succumbed to this temptation, I have almost always gone back and put the indentation back in. So I avoid collapsing scopes down to one line like this:

> 违反缩进规则。有时，会忍不住想要在短小的 if 语句、while 循环或小函数中违反缩进规则。一旦这么做了，我多数时候还是会回头加上缩进。这样就避免了出现以下这种范围层级坍塌到一行的情况：

```java
public class CommentWidget extends TextWidget
{
  public static final String REGEXP = “^#[^\r\n]*(?:(?:\r\n)|\n|\r)?”;

  public CommentWidget(ParentWidget parent, String text){super(parent, text);}
  public String render() throws Exception {return “”; }
}
```

I prefer to expand and indent the scopes instead, like this:

> 我更喜欢扩展和缩进范围，就像这样：

```java
public class CommentWidget extends TextWidget {
  public static final String REGEXP = “^#[^\r\n]*(?:(?:\r\n)|\n|\r)?”

  public CommentWidget(ParentWidget parent, String text) {
    super(parent, text);
  }

  public String render() throws Exception {
    return “”;
  }
}
```

### 5.3.4 Dummy Scopes 空范围

Sometimes the body of a while or for statement is a dummy, as shown below. I don’t like these kinds of structures and try to avoid them. When I can’t avoid them, I make sure that the dummy body is properly indented and surrounded by braces. I can’t tell you how many times I’ve been fooled by a semicolon silently sitting at the end of a while loop on the same line. Unless you make that semicolon visible by indenting it on it’s own line, it’s just too hard to see.

> 有时，while 或 for 语句的语句体为空，如下所示。我不喜欢这种结构，尽量不使用。如果无法避免，就确保空范围体的缩进，用括号包围起来。我无法告诉你，我曾经多少次被静静安坐在与 while 循环语句同一行末尾的分号所欺骗。除非你把那个分号放到另一行再加以缩进，否则就很难看到它。

```java
while (dis.read(buf, 0, readBufferSize) != -1)     ;
```

## 5.4 TEAM RULES 团队规则

The title of this section is a play on words. Every programmer has his own favorite formatting rules, but if he works in a team, then the team rules.

> 每个程序员都有自己喜欢的格式规则，但如果在一个团队中工作，就是团队说了算[4]。

A team of developers should agree upon a single formatting style, and then every member of that team should use that style. We want the software to have a consistent style. We don’t want it to appear to have been written by a bunch of disagreeing individuals.

> 一组开发者应当认同一种格式风格，每个成员都应该采用那种风格。我们想要让软件拥有一以贯之的风格。我们不想让它显得是由一大票意见相左的个人所写成。

![](figures/ch5/5_5fig_martin.jpg)

When I started the FitNesse project back in 2002, I sat down with the team to work out a coding style. This took about 10 minutes. We decided where we’d put our braces, what our indent size would be, how we would name classes, variables, and methods, and so forth. Then we encoded those rules into the code formatter of our IDE and have stuck with them ever since. These were not the rules that I prefer; they were rules decided by the team. As a member of that team I followed them when writing code in the FitNesse project.

> 002 年启动 FitNesse 项目时，我和开发团队一起制订了一套编码风格。这只花了我们 10 分钟时间。我们决定了在什么地方放置括号，缩进几个字符，如何命名类、变量和方法，如此等等。然后，我们把这些规则编写进 IDE 的代码格式功能，接着就一直沿用。这些规则并非全是我喜爱的；但它们是团队决定了的规则。作为团队一员，在为 FitNesse 项目编写代码时，我遵循这些规则。

Remember, a good software system is composed of a set of documents that read nicely. They need to have a consistent and smooth style. The reader needs to be able to trust that the formatting gestures he or she has seen in one source file will mean the same thing in others. The last thing we want to do is add more complexity to the source code by writing it in a jumble of different individual styles.

> 记住，好的软件系统是由一系列读起来不错的代码文件组成的。它们需要拥有一致和顺畅的风格。读者要能确信，他们在一个源文件中看到的格式风格在其他文件中也是同样的用法。绝对不要用各种不同的风格来编写源代码，这样会增加其复杂度。

## 5.5 UNCLE BOB’S FORMATTING RULES 鲍勃大叔的格式规则

The rules I use personally are very simple and are illustrated by the code in Listing 5-6. Consider this an example of how code makes the best coding standard document.

> 我个人使用的规则相当简单，如代码清单 5-6 所示。可以把这段代码看作是展示如何把代码写成最好的编码标准文档的范例。

Listing 5-6 CodeAnalyzer.java

> 代码清单 5-6 CodeAnalyzer.java

```java
public int getWidestLineNumber() {
  return widestLineNumber;
}

public LineWidthHistogram getLineWidthHistogram() {
  return lineWidthHistogram;
}

public double getMeanLineWidth() {
  return (double)totalChars/lineCount;
}

public int getMedianLineWidth() {
  Integer[] sortedWidths = getSortedWidths();
  int cumulativeLineCount = 0;
  for (int width : sortedWidths) {
    cumulativeLineCount += lineCountForWidth(width);
    if (cumulativeLineCount > lineCount/2)
      return width;
  }
  throw new Error(“Cannot get here”);
}

private int lineCountForWidth(int width) {
  return lineWidthHistogram.getLinesforWidth(width).size();
}

private Integer[] getSortedWidths() {
  Set<Integer> widths = lineWidthHistogram.getWidths();
  Integer[] sortedWidths = (widths.toArray(new Integer[0]));
  Arrays.sort(sortedWidths);
  return sortedWidths;
}
}
```
