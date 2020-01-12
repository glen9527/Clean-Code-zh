# 第 3 章 Functions 函数

![](figures/ch3/3_1fig_martin.jpg)

In the early days of programming we composed our systems of routines and subroutines. Then, in the era of Fortran and PL/1 we composed our systems of programs, subprograms, and functions. Nowadays only the function survives from those early days. Functions are the first line of organization in any program. Writing them well is the topic of this chapter.

> 在编程的早年岁月，系统由程序和子程序组成。后来，在 Fortran 和 PL/1 的年代，系统由程序、子程序和函数组成。如今，只有函数存活下来。函数是所有程序中的第一组代码。本章将讨论如何写好函数。

Consider the code in Listing 3-1. It’s hard to find a long function in FitNesse,1 but after a bit of searching I came across this one. Not only is it long, but it’s got duplicated code, lots of odd strings, and many strange and inobvious data types and APIs. See how much sense you can make of it in the next three minutes.

> 请看代码清单 3-1。在 FitNesse[1]中，很难找到长函数，不过我还是搜寻到一个。它不光长，而且代码也很复杂，有大量字符串、怪异而不显见的数据类型和 API。花 3 分钟时间，看能读懂多少？

1. An open-source testing tool. www.fitnesse.org

Listing 3-1 HtmlUtil.java (FitNesse 20070619)

> 代码清单 3-1 HtmlUtil.java（FitNesse 20070619）

```java
public static String testableHtml(
  PageData pageData,
  boolean includeSuiteSetup
) throws Exception {
  WikiPage wikiPage = pageData.getWikiPage();
  StringBuffer buffer = new StringBuffer();
  if (pageData.hasAttribute("Test")) {
    if (includeSuiteSetup) {
      WikiPage suiteSetup =
      PageCrawlerImpl.getInheritedPage(
              SuiteResponder.SUITE_SETUP_NAME, wikiPage
      );
      if (suiteSetup != null) {
      WikiPagePath pagePath =
        suiteSetup.getPageCrawler().getFullPath(suiteSetup);
      String pagePathName = PathParser.render(pagePath);
      buffer.append("!include -setup .")
            .append(pagePathName)
            .append("\n");
      }
    }
    WikiPage setup =
      PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
    if (setup != null) {
      WikiPagePath setupPath =
        wikiPage.getPageCrawler().getFullPath(setup);
      String setupPathName = PathParser.render(setupPath);
      buffer.append("!include -setup .")
            .append(setupPathName)
            .append("\n");
    }
  }
  buffer.append(pageData.getContent());
  if (pageData.hasAttribute("Test")) {
    WikiPage teardown =
      PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
    if (teardown != null) {
      WikiPagePath tearDownPath =
        wikiPage.getPageCrawler().getFullPath(teardown);
      String tearDownPathName = PathParser.render(tearDownPath);
      buffer.append("\n")
            .append("!include -teardown .")
            .append(tearDownPathName)
            .append("\n");
    }
    if (includeSuiteSetup) {
      WikiPage suiteTeardown =
        PageCrawlerImpl.getInheritedPage(
                SuiteResponder.SUITE_TEARDOWN_NAME,
                wikiPage
        );
      if (suiteTeardown != null) {
        WikiPagePath pagePath =
          suiteTeardown.getPageCrawler().getFullPath (suiteTeardown);
        String pagePathName = PathParser.render(pagePath);
        buffer.append("!include -teardown .")
              .append(pagePathName)
              .append("\n");
      }
    }
  }
  pageData.setContent(buffer.toString());
  return pageData.getHtml();
}
```

Do you understand the function after three minutes of study? Probably not. There’s too much going on in there at too many different levels of abstraction. There are strange strings and odd function calls mixed in with doubly nested if statements controlled by flags.

> 搞懂这个函数了吗？大概没有。有太多事发生，有太多不同层级的抽象。奇怪的字符串和函数调用，混以双重嵌套、用标识来控制的 if 语句等，不一而足。

However, with just a few simple method extractions, some renaming, and a little restructuring, I was able to capture the intent of the function in the nine lines of Listing 3-2. See whether you can understand that in the next 3 minutes.

> 不过，只要做几个简单的方法抽离和重命名操作，加上一点点重构，就能在 9 行代码之内搞掂（如代码清单 3-2 所示）。用 3 分钟阅读以下代码，看你能理解吗？

Listing 3-2 HtmlUtil.java (refactored)

> 代码清单 3-2 HtmlUtil.java（重构之后）

```java
public static String renderPageWithSetupsAndTeardowns(
  PageData pageData, boolean isSuite
) throws Exception {
  boolean isTestPage = pageData.hasAttribute("Test");
  if (isTestPage) {
    WikiPage testPage = pageData.getWikiPage();
    StringBuffer newPageContent = new StringBuffer();
    includeSetupPages(testPage, newPageContent, isSuite);
    newPageContent.append(pageData.getContent());
    includeTeardownPages(testPage, newPageContent, isSuite);
    pageData.setContent(newPageContent.toString());
  }

  return pageData.getHtml();
}
```

Unless you are a student of FitNesse, you probably don’t understand all the details. Still, you probably understand that this function performs the inclusion of some setup and teardown pages into a test page and then renders that page into HTML. If you are familiar with JUnit,2 you probably realize that this function belongs to some kind of Web-based testing framework. And, of course, that is correct. Divining that information from Listing 3-2 is pretty easy, but it’s pretty well obscured by Listing 3-1.

> 除非你正在研究 FitNesse，否则就理解不了所有细节。不过，你大概能明白，该函数包含把一些设置和拆解页放入一个测试页面，再渲染为 HTML 的操作。如果你熟悉 JUnit[2]，或许会想到，该函数归属于某个基于 Web 的测试框架。而且，这当然没错。从代码清单 3-2 中获得信息很容易，而代码清单 3-1 则晦涩难明。

2. An open-source unit-testing tool for Java. www.junit.org

So what is it that makes a function like Listing 3-2 easy to read and understand? How can we make a function communicate its intent? What attributes can we give our functions that will allow a casual reader to intuit the kind of program they live inside?

> 是什么让代码清单 3-2 易于阅读和理解？怎么才能让函数表达其意图？该给函数赋予哪些属性，好让读者一看就明白函数是属于怎样的程序？

## 3.1 SMALL! 短小

The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that. This is not an assertion that I can justify. I can’t provide any references to research that shows that very small functions are better. What I can tell you is that for nearly four decades I have written functions of all different sizes. I’ve written several nasty 3,000-line abominations. I’ve written scads of functions in the 100 to 300 line range. And I’ve written functions that were 20 to 30 lines long. What this experience has taught me, through long trial and error, is that functions should be very small.

> 函数的第一规则是要短小。第二条规则是还要更短小。我无法证明这个断言。我给不出任何证实了小函数更好的研究结果。我能说的是，近 40 年来，我写过各种不同大小的函数。我写过令人憎恶的长达 3000 行的厌物，也写过许多 100 行到 300 行的函数，我还写过 20 行到 30 行的。经过漫长的试错，经验告诉我，函数就该小。

In the eighties we used to say that a function should be no bigger than a screen-full. Of course we said that at a time when VT100 screens were 24 lines by 80 columns, and our editors used 4 lines for administrative purposes. Nowadays with a cranked-down font and a nice big monitor, you can fit 150 characters on a line and a 100 lines or more on a screen. Lines should not be 150 characters long. Functions should not be 100 lines long. Functions should hardly ever be 20 lines long.

> 在 20 世纪 80 年代，我们常说函数不该长于一屏。当然，说这话的时候，VT100 屏幕只有 24 行、80 列，而编辑器就得先占去 4 行空间放菜单。如今，用上了精致的字体和宽大的显示器，一屏里面可以显示 100 行，每行能容纳 150 个字符。每行都不应该有 150 个字符那么长。函数也不该有 100 行那么长，20 行封顶最佳。

How short should a function be? In 1999 I went to visit Kent Beck at his home in Oregon. We sat down and did some programming together. At one point he showed me a cute little Java/Swing program that he called Sparkle. It produced a visual effect on the screen very similar to the magic wand of the fairy godmother in the movie Cinderella. As you moved the mouse, the sparkles would drip from the cursor with a satisfying scintillation, falling to the bottom of the window through a simulated gravitational field. When Kent showed me the code, I was struck by how small all the functions were. I was used to functions in Swing programs that took up miles of vertical space. Every function in this program was just two, or three, or four lines long. Each was transparently obvious. Each told a story. And each led you to the next in a compelling order. That’s how short your functions should be!3

> 函数到底该有多长？1991 年，我去 Kent Beck 位于奥勒冈州（Oregon）的家中拜访。我们坐到一起写了些代码。他给我看一个叫做 Sparkle（火花闪耀）的有趣的 Java/Swing 小程序。程序在屏幕上描画电影 Cinderella（《灰姑娘》）中仙女用魔棒造出的那种视觉效果。只要移动鼠标，光标所在处就会爆发出一团令人欣喜的火花，沿着模拟重力场划落到窗口底部。肯特给我看代码的时候，我惊讶于其中那些函数尺寸之小。我看惯了 Swing 程序中长度数以里计的函数。但这个程序中每个函数都只有两行、三行或四行长。每个函数都一目了然。每个函数都只说一件事。而且，每个函数都依序把你带到下一个函数。这就是函数应该达到的短小程度！[3]

3. I asked Kent whether he still had a copy, but he was unable to find one. I searched all my old computers too, but to no avail. All that is left now is my memory of that program.

How short should your functions be? They should usually be shorter than Listing 3-2! Indeed, Listing 3-2 should really be shortened to Listing 3-3.

> 函数应该有多短小？通常来说，应该短于代码清单 3-2 中的函数！代码清单 3-2 实在应该缩短成代码清单 3-3 这个样子。

Listing 3-3 HtmlUtil.java (re-refactored)

> 代码清单 3-3 HtmlUtil.java（再次重构之后）

```java
public static String renderPageWith
    SetupsAndTeardowns(
PageData pageData, boolean isSuite) throws Exception {
  if (isTestPage(pageData))
    includeSetupAndTeardownPages(pageData, isSuite);
  return pageData.getHtml();
}
```

### Blocks and Indenting 代码块和缩进

This implies that the blocks within if statements, else statements, while statements, and so on should be one line long. Probably that line should be a function call. Not only does this keep the enclosing function small, but it also adds documentary value because the function called within the block can have a nicely descriptive name.

> if 语句、else 语句、while 语句等，其中的代码块应该只有一行。该行大抵应该是一个函数调用语句。这样不但能保持函数短小，而且，因为块内调用的函数拥有较具说明性的名称，从而增加了文档上的价值。

This also implies that functions should not be large enough to hold nested structures. Therefore, the indent level of a function should not be greater than one or two. This, of course, makes the functions easier to read and understand.

> 这也意味着函数不应该大到足以容纳嵌套结构。所以，函数的缩进层级不该多于一层或两层。当然，这样的函数易于阅读和理解。

## 3.2 DO ONE THING 只做一件事

It should be very clear that Listing 3-1 is doing lots more than one thing. It’s creating buffers, fetching pages, searching for inherited pages, rendering paths, appending arcane strings, and generating HTML, among other things. Listing 3-1 is very busy doing lots of different things. On the other hand, Listing 3-3 is doing one simple thing. It’s including setups and teardowns into test pages.

> 代码清单 3-1 显然想做好几件事。它创建缓冲区、获取页面、搜索继承下来的页面、渲染路径、添加神秘的字符串、生成 HTML，如此等等。代码清单 3-1 手忙脚乱。而代码清单 3-3 则只做一件简单的事。它将设置和拆解包纳到测试页面中。

The following advice has appeared in one form or another for 30 years or more.

> 过去 30 年以来，以下建议以不同形式一再出现：

![](figures/ch3/3_2fig_martin.jpg)

FUNCTIONS SHOULD DO ONE THING. THEY SHOULD DO IT WELL. THEY SHOULD DO IT ONLY.

> 函数应该做一件事。做好这件事。只做这一件事。

The problem with this statement is that it is hard to know what “one thing” is. Does Listing 3-3 do one thing? It’s easy to make the case that it’s doing three things:

> 问题在于很难知道那件该做的事是什么。代码清单 3-3 只做了一件事，对吧？其实也很容易看作是三件事：

1. Determining whether the page is a test page.
2. If so, including setups and teardowns.
3. Rendering the page in HTML.

---

> 1. 判断是否为测试页面；
> 2. 如果是，则容纳进设置和分拆步骤；
> 3. 渲染成 HTML。

So which is it? Is the function doing one thing or three things? Notice that the three steps of the function are one level of abstraction below the stated name of the function. We can describe the function by describing it as a brief TO4 paragraph:

> 那件事是什么？函数是做了一件事呢，还是做了三件事？注意，这三个步骤均在该函数名下的同一抽象层上。可以用简洁的 TO[4]起头段落来描述这个函数：

4. The LOGO language used the keyword “TO” in the same way that Ruby and Python use “def.” So every function began with the word “TO.” This had an interesting effect on the way functions were designed.

TO RenderPageWithSetupsAndTeardowns, we check to see whether the page is a test page and if so, we include the setups and teardowns. In either case we render the page in HTML.

> （要 RenderPageWithSetupsAndTeardowns，检查页面是否为测试页，如果是测试页，就容纳进设置和分拆步骤。无论是否测试页，都渲染成 HTML）

If a function does only those steps that are one level below the stated name of the function, then the function is doing one thing. After all, the reason we write functions is to decompose a larger concept (in other words, the name of the function) into a set of steps at the next level of abstraction.

> 如果函数只是做了该函数名下同一抽象层上的步骤，则函数还是只做了一件事。编写函数毕竟是为了把大一些的概念（换言之，函数的名称）拆分为另一抽象层上的一系列步骤。

It should be very clear that Listing 3-1 contains steps at many different levels of abstraction. So it is clearly doing more than one thing. Even Listing 3-2 has two levels of abstraction, as proved by our ability to shrink it down. But it would be very hard to meaningfully shrink Listing 3-3. We could extract the if statement into a function named includeSetupsAndTeardownsIfTestPage, but that simply restates the code without changing the level of abstraction.

> 代码清单 3-1 明显包括了处于多个不同抽象层级的步骤。显然，它所做的不止一件事。即便是代码清单 3-2 也有两个抽象层，这已被我们将其缩短的能力所证明。然而，很难再将代码清单 3-3 做有意义的缩短。可以将 if 语句拆出来做一个名为 includeSetupAndTeardonwsIfTestpage 的函数，但那只是重新诠释代码，并未改变抽象层级。

So, another way to know that a function is doing more than “one thing” is if you can extract another function from it with a name that is not merely a restatement of its implementation [G34].

> 所以，要判断函数是否不止做了一件事，还有一个方法，就是看是否能再拆出一个函数，该函数不仅只是单纯地重新诠释其实现[G34]。

### Sections within Functions 函数中的区段

Look at Listing 4-7 on page 71. Notice that the generatePrimes function is divided into sections such as declarations, initializations, and sieve. This is an obvious symptom of doing more than one thing. Functions that do one thing cannot be reasonably divided into sections.

> 请看代码清单 4-7。注意，generatePrimes 函数被切分为 declarations、initializations 和 sieve 等区段。这就是函数做事太多的明显征兆。只做一件事的函数无法被合理地切分为多个区段。

## 3.3 ONE LEVEL OF ABSTRACTION PER FUNCTION 每个函数一个抽象层级

In order to make sure our functions are doing “one thing,” we need to make sure that the statements within our function are all at the same level of abstraction. It is easy to see how Listing 3-1 violates this rule. There are concepts in there that are at a very high level of abstraction, such as getHtml(); others that are at an intermediate level of abstraction, such as: String pagePathName = PathParser.render(pagePath); and still others that are remarkably low level, such as: .append(”\n”).

> 要确保函数只做一件事，函数中的语句都要在同一抽象层级上。一眼就能看出，代码清单 3-1 违反了这条规矩。那里面有 getHtml( )等位于较高抽象层的概念，也有 String pagePathName = PathParser.render(pagePath)等位于中间抽象层的概念，还有.append("\n") 等位于相当低的抽象层的概念。

Mixing levels of abstraction within a function is always confusing. Readers may not be able to tell whether a particular expression is an essential concept or a detail. Worse, like broken windows, once details are mixed with essential concepts, more and more details tend to accrete within the function.

> 函数中混杂不同抽象层级，往往让人迷惑。读者可能无法判断某个表达式是基础概念还是细节。更恶劣的是，就像破损的窗户，一旦细节与基础概念混杂，更多的细节就会在函数中纠结起来。

### Reading Code from Top to Bottom: The Stepdown Rule 自顶向下读代码：向下规则

We want the code to read like a top-down narrative.5 We want every function to be followed by those at the next level of abstraction so that we can read the program, descending one level of abstraction at a time as we read down the list of functions. I call this The Step-down Rule.

> 我们想要让代码拥有自顶向下的阅读顺序。[5]我们想要让每个函数后面都跟着位于下一抽象层级的函数，这样一来，在查看函数列表时，就能偱抽象层级向下阅读了。我把这叫做向下规则。

5. [KP78], p. 37.

To say this differently, we want to be able to read the program as though it were a set of TO paragraphs, each of which is describing the current level of abstraction and referencing subsequent TO paragraphs at the next level down.

> 换一种说法。我们想要这样读程序：程序就像是一系列 TO 起头的段落，每一段都描述当前抽象层级，并引用位于下一抽象层级的后续 TO 起头段落。

- To include the setups and teardowns, we include setups, then we include the test page content, and then we include the teardowns.
- To include the setups, we include the suite setup if this is a suite, then we include the regular setup.
- To include the suite setup, we search the parent hierarchy for the “SuiteSetUp” page and add an include statement with the path of that page.
- To search the parent…

---

> - （要容纳设置和分拆步骤，就先容纳设置步骤，然后纳入测试页面内容，再纳入分拆步骤。）
> - （要容纳设置步骤，如果是套件，就纳入套件设置步骤，然后再纳入普通设置步骤。）
> - （要容纳套件设置步骤，先搜索“SuiteSetUp”页面的上级继承关系，再添加一个包括该页面路径的语句。）
> - （要搜索……）

It turns out to be very difficult for programmers to learn to follow this rule and write functions that stay at a single level of abstraction. But learning this trick is also very important. It is the key to keeping functions short and making sure they do “one thing.” Making the code read like a top-down set of TO paragraphs is an effective technique for keeping the abstraction level consistent.

> 程序员往往很难学会遵循这条规则，写出只停留于一个抽象层级上的函数。尽管如此，学习这个技巧还是很重要。这是保持函数短小、确保只做一件事的要诀。让代码读起来像是一系列自顶向下的 TO 起头段落是保持抽象层级协调一致的有效技巧。

Take a look at Listing 3-7 at the end of this chapter. It shows the whole testableHtml function refactored according to the principles described here. Notice how each function introduces the next, and each function remains at a consistent level of abstraction.

> 看看本章末尾的代码清单 3-7。它展示了遵循这条原则重构的完整 testableHtml 函数。留意每个函数是如何引出下一个函数，如何保持在同一抽象层上的。

## 3.4 SWITCH STATEMENTS switch 语句

It’s hard to make a small switch statement.6 Even a switch statement with only two cases is larger than I’d like a single block or function to be. It’s also hard to make a switch statement that does one thing. By their nature, switch statements always do N things. Unfortunately we can’t always avoid switch statements, but we can make sure that each switch statement is buried in a low-level class and is never repeated. We do this, of course, with polymorphism.

> 写出短小的 switch 语句很难[6]。即便是只有两种条件的 switch 语句也要比我想要的单个代码块或函数大得多。写出只做一件事的 switch 语句也很难。Switch 天生要做 N 件事。不幸我们总无法避开 switch 语句，不过还是能够确保每个 switch 都埋藏在较低的抽象层级，而且永远不重复。当然，我们利用多态来实现这一点。

6. And, of course, I include if/else chains in this.

Consider Listing 3-4. It shows just one of the operations that might depend on the type of employee.

> 请看代码清单 3-4。它呈现了可能依赖于雇员类型的仅仅一种操作。

Listing 3-4 Payroll.java

> 代码清单 3-4 Payroll.java

```java
public Money calculatePay(Employee e)
throws InvalidEmployeeType {
    switch (e.type) {
      case COMMISSIONED:
        return calculateCommissionedPay(e);
      case HOURLY:
        return calculateHourlyPay(e);
      case SALARIED:
        return calculateSalariedPay(e);
      default:
        throw new InvalidEmployeeType(e.type);
    }
  }
```

There are several problems with this function. First, it’s large, and when new employee types are added, it will grow. Second, it very clearly does more than one thing. Third, it violates the Single Responsibility Principle7 (SRP) because there is more than one reason for it to change. Fourth, it violates the Open Closed Principle8 (OCP) because it must change whenever new types are added. But possibly the worst problem with this function is that there are an unlimited number of other functions that will have the same structure. For example we could have

> 该函数有好几个问题。首先，它太长，当出现新的雇员类型时，还会变得更长。其次，它明显做了不止一件事。第三，它违反了单一权责原则（Single Responsibility Principle[7], SRP），因为有好几个修改它的理由。第四，它违反了开放闭合原则（Open Closed Principle[8],OCP），因为每当添加新类型时，就必须修改之。不过，该函数最麻烦的可能是到处皆有类似结构的函数。例如，可能会有

7. a. http://en.wikipedia.org/wiki/Single_responsibility_principle

b. http://www.objectmentor.com/resources/articles/srp.pdf

8. a. http://en.wikipedia.org/wiki/Open/closed_principle

b. http://www.objectmentor.com/resources/articles/ocp.pdf

```java
isPayday(Employee e, Date date),
```

or

> 或

```java
deliverPay(Employee e, Money pay),
```

or a host of others. All of which would have the same deleterious structure.

> 如此等等。它们的结构都有同样的问题。

The solution to this problem (see Listing 3-5) is to bury the switch statement in the basement of an ABSTRACT FACTORY,9 and never let anyone see it. The factory will use the switch statement to create appropriate instances of the derivatives of Employee, and the various functions, such as calculatePay, isPayday, and deliverPay, will be dispatched polymorphically through the Employee interface.

> 该问题的解决方案（如代码清单 3-5 所示）是将 switch 语句埋到抽象工厂[9]底下，不让任何人看到。该工厂使用 switch 语句为 Employee 的派生物创建适当的实体，而不同的函数，如 calculatePay、isPayday 和 deliverPay 等，则藉由 Employee 接口多态地接受派遣。

9. [GOF].

My general rule for switch statements is that they can be tolerated if they appear only once, are used to create polymorphic objects, and are hidden behind an inheritance relationship so that the rest of the system can’t see them [G23]. Of course every circumstance is unique, and there are times when I violate one or more parts of that rule.

> 对于 switch 语句，我的规矩是如果只出现一次，用于创建多态对象，而且隐藏在某个继承关系中，在系统其他部分看不到，就还能容忍 [G23]。当然也要就事论事，有时我也会部分或全部违反这条规矩。

Listing 3-5 Employee and Factory

> 代码清单 3-5 Employee 与工厂

```java
public abstract class Employee {
  public abstract boolean isPayday();
  public abstract Money calculatePay();
  public abstract void deliverPay(Money pay);
}
-----------------
public interface EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
-----------------
public class EmployeeFactoryImpl implements
      EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch (r.type) {
      case COMMISSIONED:
        return new CommissionedEmployee(r) ;
      case HOURLY:
        return new HourlyEmployee(r);
      case SALARIED:
        return new SalariedEmploye(r);
      default:
        throw new InvalidEmployeeType(r.type);
    }
  }
}
```

## 3.5 USE DESCRIPTIVE NAMES 使用描述性的名称

In Listing 3-7 I changed the name of our example function from testableHtml to SetupTeardownIncluder.render. This is a far better name because it better describes what the function does. I also gave each of the private methods an equally descriptive name such as isTestable or includeSetupAndTeardownPages. It is hard to overestimate the value of good names. Remember Ward’s principle: “You know you are working on clean code when each routine turns out to be pretty much what you expected.” Half the battle to achieving that principle is choosing good names for small functions that do one thing. The smaller and more focused a function is, the easier it is to choose a descriptive name.

> 在代码清单 3-7 中，我把示例函数的名称从 testableHtml 改为 SetupTeardownIncluder.render。这个名称好得多，因为它较好地描述了函数做的事。我也给每个私有方法取个同样具有描述性的名称，如 isTestable 或 includeSetupAndTeardownPages。好名称的价值怎么好评都不为过。记住沃德原则：“如果每个例程都让你感到深合己意，那就是整洁代码。”要遵循这一原则，泰半工作都在于为只做一件事的小函数取个好名字。函数越短小、功能越集中，就越便于取个好名字。

Don’t be afraid to make a name long. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment. Use a naming convention that allows multiple words to be easily read in the function names, and then make use of those multiple words to give the function a name that says what it does.

> 别害怕长名称。长而具有描述性的名称，要比短而令人费解的名称好。长而具有描述性的名称，要比描述性的长注释好。使用某种命名约定，让函数名称中的多个单词容易阅读，然后使用这些单词给函数取个能说清其功用的名称。

Don’t be afraid to spend time choosing a name. Indeed, you should try several different names and read the code with each in place. Modern IDEs like Eclipse or IntelliJ make it trivial to change names. Use one of those IDEs and experiment with different names until you find one that is as descriptive as you can make it.

> 别害怕花时间取名字。你当尝试不同的名称，实测其阅读效果。在 Eclipse 或 IntelliJ 等现代 IDE 中改名称易如反掌。使用这些 IDE 测试不同名称，直至找到最具有描述性的那一个为止。

Choosing descriptive names will clarify the design of the module in your mind and help you to improve it. It is not at all uncommon that hunting for a good name results in a favorable restructuring of the code.

> 选择描述性的名称能理清你关于模块的设计思路，并帮你改进之。追索好名称，往往导致对代码的改善重构。

Be consistent in your names. Use the same phrases, nouns, and verbs in the function names you choose for your modules. Consider, for example, the names includeSetup-AndTeardownPages, includeSetupPages, includeSuiteSetupPage, and includeSetupPage. The similar phraseology in those names allows the sequence to tell a story. Indeed, if I showed you just the sequence above, you’d ask yourself: “What happened to includeTeardownPages, includeSuiteTeardownPage, and includeTeardownPage?” How’s that for being “… pretty much what you expected.”

> 命名方式要保持一致。使用与模块名一脉相承的短语、名词和动词给函数命名。例如，includeSetupAndTeardownPages、includeSetupPages、includeSuiteSetupPage 和 includeSetupPage 等。这些名称使用了类似的措辞，依序讲出一个故事。实际上，假使我只给你看上述函数序列，你就会自问：“includeTeardownPages、includeSuiteTeardownPages 和 includeTeardownPage 又会如何？”这就是所谓“深合己意”了。

## 3.6 FUNCTION ARGUMENTS 函数参数

The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification—and then shouldn’t be used anyway.

> 最理想的参数数量是零（零参数函数），其次是一（单参数函数），再次是二（双参数函数），应尽量避免三（三参数函数）。有足够特殊的理由才能用三个以上参数（多参数函数）——所以无论如何也不要这么做。

![](figures/ch3/3_3fig_martin.jpg)

Arguments are hard. They take a lot of conceptual power. That’s why I got rid of almost all of them from the example. Consider, for instance, the StringBuffer in the example. We could have passed it around as an argument rather than making it an instance variable, but then our readers would have had to interpret it each time they saw it. When you are reading the story told by the module, includeSetupPage() is easier to understand than includeSetupPageInto(newPage-Content). The argument is at a different level of abstraction than the function name and forces you to know a detail (in other words, StringBuffer) that isn’t particularly important at that point.

> 参数不易对付。它们带有太多概念性。所以我在代码范例中几乎不加参数。比如，以 StringBuffer 为例，我们可能不把它作为实体变量，而是当作参数来传递，那样的话，读者每次看到它都得要翻译一遍。阅读模块所讲述的故事时，includeSetupPage()要比 includeSetupPageInto（newPage-Content）易于理解。参数与函数名处在不同的抽象层级，它要求你了解目前并不特别重要的细节（即那个 StringBuffer）。

Arguments are even harder from a testing point of view. Imagine the difficulty of writing all the test cases to ensure that all the various combinations of arguments work properly. If there are no arguments, this is trivial. If there’s one argument, it’s not too hard. With two arguments the problem gets a bit more challenging. With more than two arguments, testing every combination of appropriate values can be daunting.

> 从测试的角度看，参数甚至更叫人为难。想想看，要编写能确保参数的各种组合运行正常的测试用例，是多么困难的事。如果没有参数，就是小菜一碟。如果只有一个参数，也不太困难。有两个参数，问题就麻烦多了。如果参数多于两个，测试覆盖所有可能值的组合简直让人生畏。

Output arguments are harder to understand than input arguments. When we read a function, we are used to the idea of information going in to the function through arguments and out through the return value. We don’t usually expect information to be going out through the arguments. So output arguments often cause us to do a double-take.

> 输出参数比输入参数还要难以理解。读函数时，我们惯于认为信息通过参数输入函数，通过返回值从函数中输出。我们不太期望信息通过参数输出。所以，输出参数往往让人苦思之后才恍然大悟。

One input argument is the next best thing to no arguments. SetupTeardown-Includer.render(pageData) is pretty easy to understand. Clearly we are going to render the data in the pageData object.

> 相较于没有参数，只有一个输入参数算是第二好的做法。SetupTeardownInclude.render （pageData）也相当易于理解。很明显，我们将渲染 pageData 对象中的数据。

### 3.6.1 Common Monadic Forms 一元函数的普遍形式

There are two very common reasons to pass a single argument into a function. You may be asking a question about that argument, as in boolean fileExists(“MyFile”). Or you may be operating on that argument, transforming it into something else and returning it. For example, InputStream fileOpen(“MyFile”) transforms a file name String into an InputStream return value. These two uses are what readers expect when they see a function. You should choose names that make the distinction clear, and always use the two forms in a consistent context. (See Command Query Separation below.)

> 向函数传入单个参数有两种极普遍的理由。你也许会问关于那个参数的问题，就像在 boolean fileExists("MyFile")中那样。也可能是操作该参数，将其转换为其他什么东西，再输出之。例如，InputStream fileOpen("MyFile")把 String 类型的文件名转换为 InputStream 类型的返回值。这就是读者看到函数时所期待的东西。你应当选用较能区别这两种理由的名称，而且总在一致的上下文中使用这两种形式。

A somewhat less common, but still very useful form for a single argument function, is an event. In this form there is an input argument but no output argument. The overall program is meant to interpret the function call as an event and use the argument to alter the state of the system, for example, void passwordAttemptFailedNtimes(int attempts). Use this form with care. It should be very clear to the reader that this is an event. Choose names and contexts carefully.

> 还有一种虽不那么普遍但仍极有用的单参数函数形式，那就是事件（event）。在这种形式中，有输入参数而无输出参数。程序将函数看作是一个事件，使用该参数修改系统状态，例如 void passwordAttemptFailedNtimes(int attempts)。小心使用这种形式。应该让读者很清楚地了解它是个事件。谨慎地选用名称和上下文语境。

Try to avoid any monadic functions that don’t follow these forms, for example, void includeSetupPageInto(StringBuffer pageText). Using an output argument instead of a return value for a transformation is confusing. If a function is going to transform its input argument, the transformation should appear as the return value. Indeed, StringBuffer transform(StringBuffer in) is better than void transform(StringBuffer out), even if the implementation in the first case simply returns the input argument. At least it still follows the form of a transformation.

> 尽量避免编写不遵循这些形式的一元函数，例如，void includeSetupPageInto(StringBuffer pageText)。对于转换，使用输出参数而非返回值令人迷惑。如果函数要对输入参数进行转换操作，转换结果就该体现为返回值。实际上，StringBuffer transform(StringBuffer in)要比 void transform(StringBuffer out)强，即便第一种形式只简单地返回输参数也是这样。至少，它遵循了转换的形式。

### 3.6.2 Flag Arguments 标识参数

Flag arguments are ugly. Passing a boolean into a function is a truly terrible practice. It immediately complicates the signature of the method, loudly proclaiming that this function does more than one thing. It does one thing if the flag is true and another if the flag is false!

> 标识参数丑陋不堪。向函数传入布尔值简直就是骇人听闻的做法。这样做，方法签名立刻变得复杂起来，大声宣布本函数不止做一件事。如果标识为 true 将会这样做，标识为 false 则会那样做！

In Listing 3-7 we had no choice because the callers were already passing that flag in, and I wanted to limit the scope of refactoring to the function and below. Still, the method call render(true) is just plain confusing to a poor reader. Mousing over the call and seeing render(boolean isSuite) helps a little, but not that much. We should have split the function into two: renderForSuite() and renderForSingleTest().

> 在代码清单 3-7 中，我们别无选择，因为调用者已经传入了那个标识，而我想把重构范围限制在该函数及该函数以下范围之内。方法调用 render(true)对于可怜的读者来说仍然摸不着头脑。卷动屏幕，看到 render(Boolean isSuite)，稍许有点帮助，不过仍然不够。应该把该函数一分为二：reanderForSuite( )和 renderForSingleTest( )。

### 3.6.3 Dyadic Functions 二元函数

A function with two arguments is harder to understand than a monadic function. For example, writeField(name) is easier to understand than writeField(output-Stream, name).10 Though the meaning of both is clear, the first glides past the eye, easily depositing its meaning. The second requires a short pause until we learn to ignore the first parameter. And that, of course, eventually results in problems because we should never ignore any part of code. The parts we ignore are where the bugs will hide.

> 有两个参数的函数要比一元函数难懂。例如，writeField(name)比 writeField(outputStream,name)[10]好懂。尽管两种情况下意义都很清楚，但第一个只要扫一眼就明白，更好地表达了其意义。第二个就得暂停一下才能明白，除非我们学会忽略第一个参数。而且最终那也会导致问题，因为我们根本就不该忽略任何代码。忽略掉的部分就是缺陷藏身之地。

10. I just finished refactoring a module that used the dyadic form. I was able to make the outputStream a field of the class and convert all the writeField calls to the monadic form. The result was much cleaner.

There are times, of course, where two arguments are appropriate. For example, Point p = new Point(0,0); is perfectly reasonable. Cartesian points naturally take two arguments. Indeed, we’d be very surprised to see new Point(0). However, the two arguments in this case are ordered components of a single value! Whereas output-Stream and name have neither a natural cohesion, nor a natural ordering.

> 当然，有些时候两个参数正好。例如，Point p = new Point(0,0);就相当合理。笛卡儿点天生拥有两个参数。如果看到 new Point(0)，我们会倍感惊讶。然而，本例中的两个参数却只是单个值的有序组成部分！而 output-Stream 和 name 则既非自然的组合，也不是自然的排序。

Even obvious dyadic functions like assertEquals(expected, actual) are problematic. How many times have you put the actual where the expected should be? The two arguments have no natural ordering. The expected, actual ordering is a convention that requires practice to learn.

> 即便是如 assertEquals(expected, actual)这样的二元函数也有其问题。你有多少次会搞错 actual 和 expected 的位置呢？这两个参数没有自然的顺序。expected 在前，actual 在后，只是一种需要学习的约定罢了。

Dyads aren’t evil, and you will certainly have to write them. However, you should be aware that they come at a cost and should take advantage of what mechanisms may be available to you to convert them into monads. For example, you might make the writeField method a member of outputStream so that you can say outputStream. writeField(name). Or you might make the outputStream a member variable of the current class so that you don’t have to pass it. Or you might extract a new class like FieldWriter that takes the outputStream in its constructor and has a write method.

> 二元函数不算恶劣，而且你当然也会编写二元函数。不过，你得小心，使用二元函数要付出代价。你应该尽量利用一些机制将其转换成一元函数。例如，可以把 writeField 方法写成 outputStream 的成员之一，从而能这样用：outputStream.writeField(name)。或者，也可以把 outputStream 写成当前类的成员变量，从而无需再传递它。还可以分离出类似 FieldWriter 的新类，在其构造器中采用 outputStream，并且包含一个 write 方法。

### 3.6.4 Triads 三元函数

Functions that take three arguments are significantly harder to understand than dyads. The issues of ordering, pausing, and ignoring are more than doubled. I suggest you think very carefully before creating a triad.

> 有三个参数的函数要比二元函数难懂得多。排序、琢磨、忽略的问题都会加倍体现。建议你在写三元函数前一定要想清楚。

For example, consider the common overload of assertEquals that takes three arguments: assertEquals(message, expected, actual). How many times have you read the message and thought it was the expected? I have stumbled and paused over that particular triad many times. In fact, every time I see it, I do a double-take and then learn to ignore the message.

> 例如，设想 assertEquals 有三个参数：assertEquals(message, expected, actual)。有多少次，你读到 message，错以为它是 expected 呢？我就常栽在这个三元函数上。实际上，每次我看到这里，总会绕半天圈子，最后学会了忽略 message 参数。

On the other hand, here is a triad that is not quite so insidious: assertEquals(1.0, amount, .001). Although this still requires a double-take, it’s one that’s worth taking. It’s always good to be reminded that equality of floating point values is a relative thing.

> 另一方面，这里有个并不那么险恶的三元函数：assertEquals(1.0, amount, .001)。虽然也要费点神，还是值得的。得到“浮点值的等值是相对而言”的提示总是好的。

### 3.6.5 Argument Objects 参数对象

When a function seems to need more than two or three arguments, it is likely that some of those arguments ought to be wrapped into a class of their own. Consider, for example, the difference between the two following declarations:

> 如果函数看来需要两个、三个或三个以上参数，就说明其中一些参数应该封装为类了。例如，下面两个声明的差别：

```java
Circle makeCircle(double x, double y, double radius);
Circle makeCircle(Point center, double radius);
```

Reducing the number of arguments by creating objects out of them may seem like cheating, but it’s not. When groups of variables are passed together, the way x and y are in the example above, they are likely part of a concept that deserves a name of its own.

> 从参数创建对象，从而减少参数数量，看起来像是在作弊，但实则并非如此。当一组参数被共同传递，就像上例中的 x 和 y 那样，往往就是该有自己名称的某个概念的一部分。

### 3.6.6 Argument Lists 参数列表

Sometimes we want to pass a variable number of arguments into a function. Consider, for example, the String.format method:

> 有时，我们想要向函数传入数量可变的参数。例如，

```java
String.format(”%s worked %.2f hours.”, name, hours);
```

If the variable arguments are all treated identically, as they are in the example above, then they are equivalent to a single argument of type List. By that reasoning, String.format is actually dyadic. Indeed, the declaration of String.format as shown below is clearly dyadic.

> 如果可变参数像上例中那样被同等对待，就和类型为 List 的单个参数没什么两样。这样一来，String.formate 实则是二元函数。下列 String.format 的声明也很明显是二元的：

```java
public String format(String format, Object… args)
```

So all the same rules apply. Functions that take variable arguments can be monads, dyads, or even triads. But it would be a mistake to give them more arguments than that.

> 同理，有可变参数的函数可能是一元、二元甚至三元。超过这个数量就可能要犯错了。

```java
void monad(Integer… args);
void dyad(String name, Integer… args);
void triad(String name, int count, Integer… args);
```

### 3.6.7 Verbs and Keywords 动词与关键字

Choosing good names for a function can go a long way toward explaining the intent of the function and the order and intent of the arguments. In the case of a monad, the function and argument should form a very nice verb/noun pair. For example, write(name) is very evocative. Whatever this “name” thing is, it is being “written.” An even better name might be writeField(name), which tells us that the “name” thing is a “field.”

> 给函数取个好名字，能较好地解释函数的意图，以及参数的顺序和意图。对于一元函数，函数和参数应当形成一种非常良好的动词/名词对形式。例如，write(name)就相当令人认同。不管这个“name”是什么，都要被“write”。更好的名称大概是 writeField(name)，它告诉我们，“name”是一个“field”。

This last is an example of the keyword form of a function name. Using this form we encode the names of the arguments into the function name. For example, assertEquals might be better written as assertExpectedEqualsActual(expected, actual). This strongly mitigates the problem of having to remember the ordering of the arguments.

> 最后那个例子展示了函数名称的关键字（keyword）形式。使用这种形式，我们把参数的名称编码成了函数名。例如，assertEqual 改成 assertExpectedEqualsActual(expected, actual)可能会好些。这大大减轻了记忆参数顺序的负担。

## 3.7 HAVE NO SIDE EFFECTS 无副作用

Side effects are lies. Your function promises to do one thing, but it also does other hidden things. Sometimes it will make unexpected changes to the variables of its own class. Sometimes it will make them to the parameters passed into the function or to system globals. In either case they are devious and damaging mistruths that often result in strange temporal couplings and order dependencies.

> 副作用是一种谎言。函数承诺只做一件事，但还是会做其他被藏起来的事。有时，它会对自己类中的变量做出未能预期的改动。有时，它会把变量搞成向函数传递的参数或是系统全局变量。无论哪种情况，都是具有破坏性的，会导致古怪的时序性耦合及顺序依赖。

Consider, for example, the seemingly innocuous function in Listing 3-6. This function uses a standard algorithm to match a userName to a password. It returns true if they match and false if anything goes wrong. But it also has a side effect. Can you spot it?

> 以代码清单 3-6 中看似无伤大雅的函数为例。该函数使用标准算法来匹配 userName 和 password。如果匹配成功，返回 true，如果失败则返回 false。但它会有副作用。你知道问题所在吗？

Listing 3-6 UserValidator.java

> 代码清单 3-6 UserValidator.java

```java
public class UserValidator {
  private Cryptographer cryptographer;

  public boolean checkPassword(String userName, String password) {
    User user = UserGateway.findByName(userName);
    if (user != User.NULL) {
      String codedPhrase = user.
      getPhraseEncodedByPassword();
      String phrase = cryptographer.decrypt(codedPhrase, password);
      if ("Valid Password".equals(phrase)) {
        Session.initialize();
        return true;
      }
    }
    return false;
  }
}
```

The side effect is the call to Session.initialize(), of course. The checkPassword function, by its name, says that it checks the password. The name does not imply that it initializes the session. So a caller who believes what the name of the function says runs the risk of erasing the existing session data when he or she decides to check the validity of the user.

> 当然了，副作用就在于对 Session.initialize( )的调用。checkPassword 函数，顾名思义，就是用来检查密码的。该名称并未暗示它会初始化该次会话。所以，当某个误信了函数名的调用者想要检查用户有效性时，就得冒抹除现有会话数据的风险。

This side effect creates a temporal coupling. That is, checkPassword can only be called at certain times (in other words, when it is safe to initialize the session). If it is called out of order, session data may be inadvertently lost. Temporal couplings are confusing, especially when hidden as a side effect. If you must have a temporal coupling, you should make it clear in the name of the function. In this case we might rename the function checkPasswordAndInitializeSession, though that certainly violates “Do one thing.”

> 这一副作用造出了一次时序性耦合。也就是说，checkPassword 只能在特定时刻调用（换言之，在初始化会话是安全的时候调用）。如果在不合适的时候调用，会话数据就有可能沉默地丢失。时序性耦合令人迷惑，特别是当它躲在副作用后面时。如果一定要时序性耦合，就应该在函数名称中说明。在本例中，可以重命名函数为 checkPasswordAndInitializeSession，虽然那还是违反了“只做一件事”的规则。

### Output Arguments 输出参数

Arguments are most naturally interpreted as inputs to a function. If you have been programming for more than a few years, I’m sure you’ve done a double-take on an argument that was actually an output rather than an input. For example:

> 参数多数会被自然而然地看作是函数的输入。如果你编过好些年程序，我担保你一定被用作输出而非输入的参数迷惑过。例如：

```java
appendFooter(s);
```

Does this function append s as the footer to something? Or does it append some footer to s? Is s an input or an output? It doesn’t take long to look at the function signature and see:

> 这个函数是把 s 添加到什么东西后面吗？或者它把什么东西添加到了 s 后面？s 是输入参数还是输出参数？稍许花点时间看看函数签名：

```java
public void appendFooter(StringBuffer report)
```

This clarifies the issue, but only at the expense of checking the declaration of the function. Anything that forces you to check the function signature is equivalent to a double-take. It’s a cognitive break and should be avoided.

> 事情清楚了，但付出了检查函数声明的代价。你被迫检查函数签名，就得花上一点时间。应该避免这种中断思路的事。

In the days before object oriented programming it was sometimes necessary to have output arguments. However, much of the need for output arguments disappears in OO languages because this is intended to act as an output argument. In other words, it would be better for appendFooter to be invoked as

> 在面向对象编程之前的岁月里，有时的确需要输出参数。然而，面向对象语言中对输出参数的大部分需求已经消失了，因为 this 也有输出函数的意味在内。换言之，最好是这样调用 appendFooter：

```java
report.appendFooter();
```

In general output arguments should be avoided. If your function must change the state of something, have it change the state of its owning object.

> 在面向对象编程之前的岁月里，有时的确需要输出参数。然而，面向对象语言中对输出参数的大部分需求已经消失了，因为 this 也有输出函数的意味在内。换言之，最好是这样调用 appendFooter：

## 3.8 COMMAND QUERY SEPARATION 分隔指令与询问

Functions should either do something or answer something, but not both. Either your function should change the state of an object, or it should return some information about that object. Doing both often leads to confusion. Consider, for example, the following function:

> 函数要么做什么事，要么回答什么事，但二者不可得兼。函数应该修改某对象的状态，或是返回该对象的有关信息。两样都干常会导致混乱。看看下面的例子：

```java
public boolean set(String attribute, String value);
```

This function sets the value of a named attribute and returns true if it is successful and false if no such attribute exists. This leads to odd statements like this:

> 该函数设置某个指定属性，如果成功就返回 true，如果不存在那个属性则返回 false。这样就导致了以下语句：

```java
if (set(”username”, ”unclebob”))…
```

Imagine this from the point of view of the reader. What does it mean? Is it asking whether the “username” attribute was previously set to “unclebob”? Or is it asking whether the “username” attribute was successfully set to “unclebob”? It’s hard to infer the meaning from the call because it’s not clear whether the word “set” is a verb or an adjective.

> 从读者的角度考虑一下吧。这是什么意思呢？它是在问 username 属性值是否之前已设置为 unclebob 吗？或者它是在问 username 属性值是否成功设置为 unclebob 呢？从这行调用很难判断其含义，因为 set 是动词还是形容词并不清楚。

The author intended set to be a verb, but in the context of the if statement it feels like an adjective. So the statement reads as “If the username attribute was previously set to unclebob” and not “set the username attribute to unclebob and if that worked then.…” We could try to resolve this by renaming the set function to setAndCheckIfExists, but that doesn’t much help the readability of the if statement. The real solution is to separate the command from the query so that the ambiguity cannot occur.

> 作者本意，set 是个动词，但在 if 语句的上下文中，感觉它像是个形容词。该语句读起来像是说“如果 username 属性值之前已被设置为 uncleob”，而不是“设置 username 属性值为 unclebob，看看是否可行，然后……”。要解决这个问题，可以将 set 函数重命名为 setAndCheckIfExists，但这对提高 if 语句的可读性帮助不大。真正的解决方案是把指令与询问分隔开来，防止混淆的发生：

```java
if (attributeExists(”username”)) {
  setAttribute(”username”, ”unclebob”);
  …
}
```

## 3.9 PREFER EXCEPTIONS TO RETURNING ERROR CODES 使用异常替代返回错误码

Returning error codes from command functions is a subtle violation of command query separation. It promotes commands being used as expressions in the predicates of if statements.

> 从指令式函数返回错误码轻微违反了指令与询问分隔的规则。它鼓励了在 if 语句判断中把指令当作表达式使用。

```java
   if (deletePage(page) == E_OK)
```

This does not suffer from verb/adjective confusion but does lead to deeply nested structures. When you return an error code, you create the problem that the caller must deal with the error immediately.

> 这不会引起动词/形容词混淆，但却导致更深层次的嵌套结构。当返回错误码时，就是在要求调用者立刻处理错误。

```java
if (deletePage(page) == E_OK) {
  if (registry.deleteReference(page.name) == E_OK) {
    if (configKeys.deleteKey(page.name.makeKey()) == E_OK){
      logger.log("page deleted");
    } else {
      logger.log("configKey not deleted");
    }
  } else {
    logger.log("deleteReference from registry failed");
  }
} else {
  logger.log("delete failed");
  return E_ERROR;
}
```

On the other hand, if you use exceptions instead of returned error codes, then the error processing code can be separated from the happy path code and can be simplified:

> 另一方面，如果使用异常替代返回错误码，错误处理代码就能从主路径代码中分离出来，得到简化：

```java
try {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}
catch (Exception e) {
  logger.log(e.getMessage());
}
```

### 3.9.1 Extract Try/Catch Blocks 抽离 Try/Catch 代码块

Try/catch blocks are ugly in their own right. They confuse the structure of the code and mix error processing with normal processing. So it is better to extract the bodies of the try and catch blocks out into functions of their own.

> Try/catch 代码块丑陋不堪。它们搞乱了代码结构，把错误处理与正常流程混为一谈。最好把 try 和 catch 代码块的主体部分抽离出来，另外形成函数。

```java
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  }
  catch (Exception e) {
    logError(e);
  }
}

private void deletePageAndAllReferences(Page page) throws Exception {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
  logger.log(e.getMessage());
}
```

In the above, the delete function is all about error processing. It is easy to understand and then ignore. The deletePageAndAllReferences function is all about the processes of fully deleting a page. Error handling can be ignored. This provides a nice separation that makes the code easier to understand and modify.

> 在上例中，delete 函数只与错误处理有关。很容易理解然后就忽略掉。deletePageAndAllReference 函数只与完全删除一个 page 有关。错误处理可以忽略掉。有了这样美妙的区隔，代码就更易于理解和修改了。

### 3.9.2 Error Handling Is One Thing 错误处理就是一件事

Functions should do one thing. Error handing is one thing. Thus, a function that handles errors should do nothing else. This implies (as in the example above) that if the keyword try exists in a function, it should be the very first word in the function and that there should be nothing after the catch/finally blocks.

> 函数应该只做一件事。错误处理就是一件事。因此，处理错误的函数不该做其他事。这意味着（如上例所示）如果关键字 try 在某个函数中存在，它就该是这个函数的第一个单词，而且在 catch/finally 代码块后面也不该有其他内容。

### 3.9.3 The Error.java Dependency Magnet Error.java 依赖磁铁

Returning error codes usually implies that there is some class or enum in which all the error codes are defined.

> 返回错误码通常暗示某处有个类或是枚举，定义了所有错误码。

```java
public enum Error {
  OK,
  INVALID,
  NO_SUCH,
  LOCKED,
  OUT_OF_RESOURCES,

  WAITING_FOR_EVENT;
}
```

Classes like this are a dependency magnet; many other classes must import and use them. Thus, when the Error enum changes, all those other classes need to be recompiled and redeployed.11 This puts a negative pressure on the Error class. Programmers don’t want to add new errors because then they have to rebuild and redeploy everything. So they reuse old error codes instead of adding new ones.

> 这样的类就是一块依赖磁铁（dependency magnet）；其他许多类都得导入和使用它。当 Error 枚举修改时，所有这些其他的类都需要重新编译和部署。[11]这对 Error 类造成了负面压力。程序员不愿增加新的错误代码，因为这样他们就得重新构建和部署所有东西。于是他们就复用旧的错误码，而不添加新的。

11. Those who felt that they could get away without recompiling and redeploying have been found—and dealt with.

When you use exceptions rather than error codes, then new exceptions are derivatives of the exception class. They can be added without forcing any recompilation or redeployment.12

> 使用异常替代错误码，新异常就可以从异常类派生出来，无需重新编译或重新部署[12]。

12. This is an example of the Open Closed Principle (OCP) [PPP02].

## 3.10 DON’T REPEAT YOURSELF13 别重复自己

13. The DRY principle. [PRAG].

Look back at Listing 3-1 carefully and you will notice that there is an algorithm that gets repeated four times, once for each of the SetUp, SuiteSetUp, TearDown, and SuiteTearDown cases. It’s not easy to spot this duplication because the four instances are intermixed with other code and aren’t uniformly duplicated. Still, the duplication is a problem because it bloats the code and will require four-fold modification should the algorithm ever have to change. It is also a four-fold opportunity for an error of omission.

> 回头仔细看看代码清单 3-1，你会注意到，有个算法在 SetUp、SuiteSetUp、TearDown 和 SuiteTearDown 中总共被重复了 4 次。识别重复不太容易，因为这 4 次重复与其他代码混在一起，而且也不完全一样。这样的重复还是会导致问题，因为代码因此而臃肿，且当算法改变时需要修改 4 处地方。而且也会增加 4 次放过错误的可能性。

![](figures/ch3/3_4fig_martin.jpg)

This duplication was remedied by the include method in Listing 3-7. Read through that code again and notice how the readability of the whole module is enhanced by the reduction of that duplication.

> 使用代码清单 3-7 中的 include 方法修正了这些重复。再读一遍那段代码，你会注意到，整个模块的可读性因为重复的消除而得到了提升。

Duplication may be the root of all evil in software. Many principles and practices have been created for the purpose of controlling or eliminating it. Consider, for example, that all of Codd’s database normal forms serve to eliminate duplication in data. Consider also how object-oriented programming serves to concentrate code into base classes that would otherwise be redundant. Structured programming, Aspect Oriented Programming, Component Oriented Programming, are all, in part, strategies for eliminating duplication. It would appear that since the invention of the subroutine, innovations in software development have been an ongoing attempt to eliminate duplication from our source code.

> 重复可能是软件中一切邪恶的根源。许多原则与实践规则都是为控制与消除重复而创建。例如，全部考德（Codd）[14]数据库范式都是为消灭数据重复而服务。再想想看，面向对象编程是如何将代码集中到基类，从而避免了冗余。面向方面编程（Aspect Oriented Programming）、面向组件编程（Component Oriented Programming）多少也都是消除重复的一种策略。看来，自子程序发明以来，软件开发领域的所有创新都是在不断尝试从源代码中消灭重复。

## 3.11 STRUCTURED PROGRAMMING 结构化编程

Some programmers follow Edsger Dijkstra’s rules of structured programming.14 Dijkstra said that every function, and every block within a function, should have one entry and one exit. Following these rules means that there should only be one return statement in a function, no break or continue statements in a loop, and never, ever, any goto statements.

> 有些程序员遵循 Edsger Dijkstra 的结构化编程规则[15]。Dijkstra 认为，每个函数、函数中的每个代码块都应该有一个入口、一个出口。遵循这些规则，意味着在每个函数中只该有一个 return 语句，循环中不能有 break 或 continue 语句，而且永永远远不能有任何 goto 语句。

14. [SP72].

While we are sympathetic to the goals and disciplines of structured programming, those rules serve little benefit when functions are very small. It is only in larger functions that such rules provide significant benefit.

> 我们赞成结构化编程的目标和规范，但对于小函数，这些规则助益不大。只有在大函数中，这些规则才会有明显的好处。

So if you keep your functions small, then the occasional multiple return, break, or continue statement does no harm and can sometimes even be more expressive than the single-entry, single-exit rule. On the other hand, goto only makes sense in large functions, so it should be avoided.

> 所以，只要函数保持短小，偶尔出现的 return、break 或 continue 语句没有坏处，甚至还比单入单出原则更具有表达力。另外一方面，goto 只在大函数中才有道理，所以应该尽量避免使用。

## 3.12 HOW DO YOU WRITE FUNCTIONS LIKE THIS? 如何写出这样的函数

Writing software is like any other kind of writing. When you write a paper or an article, you get your thoughts down first, then you massage it until it reads well. The first draft might be clumsy and disorganized, so you wordsmith it and restructure it and refine it until it reads the way you want it to read.

> 写代码和写别的东西很像。在写论文或文章时，你先想什么就写什么，然后再打磨它。初稿也许粗陋无序，你就斟酌推敲，直至达到你心目中的样子。

When I write functions, they come out long and complicated. They have lots of indenting and nested loops. They have long argument lists. The names are arbitrary, and there is duplicated code. But I also have a suite of unit tests that cover every one of those clumsy lines of code.

> 我写函数时，一开始都冗长而复杂。有太多缩进和嵌套循环。有过长的参数列表。名称是随意取的，也会有重复的代码。不过我会配上一套单元测试，覆盖每行丑陋的代码。

So then I massage and refine that code, splitting out functions, changing names, eliminating duplication. I shrink the methods and reorder them. Sometimes I break out whole classes, all the while keeping the tests passing.

> 然后我打磨这些代码，分解函数、修改名称、消除重复。我缩短和重新安置方法。有时我还拆散类。同时保持测试通过。最后，遵循本章列出的规则，我组装好这些函数。

In the end, I wind up with functions that follow the rules I’ve laid down in this chapter. I don’t write them that way to start. I don’t think anyone could.

> 我并不从一开始就按照规则写函数。我想没人做得到。

## 3.13 CONCLUSION 小结

Every system is built from a domain-specific language designed by the programmers to describe that system. Functions are the verbs of that language, and classes are the nouns. This is not some throwback to the hideous old notion that the nouns and verbs in a requirements document are the first guess of the classes and functions of a system. Rather, this is a much older truth. The art of programming is, and has always been, the art of language design.

> 每个系统都是使用某种领域特定语言搭建，而这种语言是程序员设计来描述那个系统的。函数是语言的动词，类是名词。这并非是退回到那种认为需求文档中的名词和动词就是系统中类和函数的最初设想的可怕的旧观念。其实这是个历史更久的真理。编程艺术是且一直就是语言设计的艺术。

Master programmers think of systems as stories to be told rather than programs to be written. They use the facilities of their chosen programming language to construct a much richer and more expressive language that can be used to tell that story. Part of that domain-specific language is the hierarchy of functions that describe all the actions that take place within that system. In an artful act of recursion those actions are written to use the very domain-specific language they define to tell their own small part of the story.

> 大师级程序员把系统当作故事来讲，而不是当作程序来写。他们使用选定编程语言提供的工具构建一种更为丰富且更具表达力的语言，用来讲那个故事。那种领域特定语言的一个部分，就是描述在系统中发生的各种行为的函数层级。在一种狡猾的递归操作中，这些行为使用它们定义的与领域紧密相关的语言讲述自己那个小故事。

This chapter has been about the mechanics of writing functions well. If you follow the rules herein, your functions will be short, well named, and nicely organized. But never forget that your real goal is to tell the story of the system, and that the functions you write need to fit cleanly together into a clear and precise language to help you with that telling.

> 本章所讲述的是有关编写良好函数的机制。如果你遵循这些规则，函数就会短小，有个好名字，而且被很好地归置。不过永远别忘记，真正的目标在于讲述系统的故事，而你编写的函数必须干净利落地拼装到一起，形成一种精确而清晰的语言，帮助你讲故事。

## 3.14 SETUPTEARDOWNINCLUDER SetupTeardownIncluder 程序

Listing 3-7 SetupTeardownIncluder.java

> 代码清单 3-7 SetupTeardownIncluder.java

```java
package fitnesse.html;

import fitnesse.responders.run.SuiteResponder;
import fitnesse.wiki.*;

public class SetupTeardownIncluder {
  private PageData pageData;
  private boolean isSuite;
  private WikiPage testPage;
  private StringBuffer newPageContent;
  private PageCrawler pageCrawler;


  public static String render(PageData pageData) throws Exception {
    return render(pageData, false);
  }

  public static String render(PageData pageData, boolean isSuite)
    throws Exception {
    return new SetupTeardownIncluder(pageData).render(isSuite);
  }

  private SetupTeardownIncluder(PageData pageData) {
    this.pageData = pageData;
    testPage = pageData.getWikiPage();
    pageCrawler = testPage.getPageCrawler();
    newPageContent = new StringBuffer();
  }

  private String render(boolean isSuite) throws Exception {
    this.isSuite = isSuite;
    if (isTestPage())
      includeSetupAndTeardownPages();
    return pageData.getHtml();
  }

  private boolean isTestPage() throws Exception {
    return pageData.hasAttribute("Test");
  }

  private void includeSetupAndTeardownPages() throws Exception {
    includeSetupPages();
    includePageContent();
    includeTeardownPages();
    updatePageContent();
  }


  private void includeSetupPages() throws Exception {
    if (isSuite)
      includeSuiteSetupPage();
    includeSetupPage();
  }

  private void includeSuiteSetupPage() throws Exception {
    include(SuiteResponder.SUITE_SETUP_NAME, "-setup");
  }

  private void includeSetupPage() throws Exception {
    include("SetUp", "-setup");
  }

  private void includePageContent() throws Exception {
    newPageContent.append(pageData.getContent());
  }

  private void includeTeardownPages() throws Exception {
    includeTeardownPage();
    if (isSuite)
      includeSuiteTeardownPage();
  }

  private void includeTeardownPage() throws Exception {
    include("TearDown", "-teardown");
  }

  private void includeSuiteTeardownPage() throws Exception {
    include(SuiteResponder.SUITE_TEARDOWN_NAME, "-teardown");
  }

  private void updatePageContent() throws Exception {
    pageData.setContent(newPageContent.toString());
  }

  private void include(String pageName, String arg) throws Exception {
    WikiPage inheritedPage = findInheritedPage(pageName);
    if (inheritedPage != null) {
      String pagePathName = getPathNameForPage(inheritedPage);
      buildIncludeDirective(pagePathName, arg);
    }
  }

  private WikiPage findInheritedPage(String pageName) throws Exception {
    return PageCrawlerImpl.getInheritedPage(pageName, testPage);
  }

  private String getPathNameForPage(WikiPage page) throws Exception {
    WikiPagePath pagePath = pageCrawler.getFullPath(page);
    return PathParser.render(pagePath);
  }

  private void buildIncludeDirective(String pagePathName, String arg) {
    newPageContent
      .append("\n!include ")
      .append(arg)
      .append(" .")
      .append(pagePathName)
      .append("\n");
  }
}
```
