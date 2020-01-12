# 第 2 章 Meaningful Names 有意义的命名

![](figures/ch2/2_1fig_martin.jpg)

by Tim Ottinger

## 2.1 INTRODUCTION 介绍

Names are everywhere in software. We name our variables, our functions, our arguments, classes, and packages. We name our source files and the directories that contain them. We name our jar files and war files and ear files. We name and name and name. Because we do so much of it, we’d better do it well. What follows are some simple rules for creating good names.

> 软件中随处可见命名。我们给变量、函数、参数、类和封包命名。我们给源代码及源代码所在目录命名。我们给 jar 文件、war 文件和 ear 文件命名。我们命名、命名，不断命名。既然有这么多命名要做，不妨做好它。下文列出了取个好名字的几条简单规则。

## 2.2 USE INTENTION-REVEALING NAMES 名副其实

It is easy to say that names should reveal intent. What we want to impress upon you is that we are serious about this. Choosing good names takes time but saves more than it takes. So take care with your names and change them when you find better ones. Everyone who reads your code (including you) will be happier if you do.

> 名副其实说起来简单。我们想要强调，这事很严肃。选个好名字要花时间，但省下来的时间比花掉的多。注意命名，而且一旦发现有更好的名称，就换掉旧的。这么做，读你代码的人（包括你自己）都会更开心。

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

> 变量、函数或类的名称应该已经答复了所有的大问题。它该告诉你，它为什么会存在，它做什么事，应该怎么用。如果名称需要注释来补充，那就不算是名副其实。

```java
int d; // elapsed time in days
```

The name d reveals nothing. It does not evoke a sense of elapsed time, nor of days. We should choose a name that specifies what is being measured and the unit of that measurement:

> 名称 d 什么也没说明。它没有引起对时间消逝的感觉，更别说以日计了。我们应该选择指明了计量对象和计量单位的名称：

```java
int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
```

Choosing names that reveal intent can make it much easier to understand and change code. What is the purpose of this code?

> 选择体现本意的名称能让人更容易理解和修改代码。下列代码的目的何在？

```java
public List<int[]> getThem() {
  List<int[]> list1 = new ArrayList<int[]>();
  for (int[] x : theList)
    if (x[0] == 4)
      list1.add(x);
  return list1;
}
```

Why is it hard to tell what this code is doing? There are no complex expressions. Spacing and indentation are reasonable. There are only three variables and two constants mentioned. There aren’t even any fancy classes or polymorphic methods, just a list of arrays (or so it seems).

> 为什么难以说明上列代码要做什么事？里面并没有复杂的表达式。空格和缩进中规中矩。只用到三个变量和两个常量。甚至没有涉及任何其他类或多态方法，只是（或者看起来是）一个数组的列表而已。

The problem isn’t the simplicity of the code but the implicity of the code (to coin a phrase): the degree to which the context is not explicit in the code itself. The code implicitly requires that we know the answers to questions such as:

> 问题不在于代码的简洁度，而是在于代码的模糊度：即上下文在代码中未被明确体现的程度。上列代码要求我们了解类似以下问题的答案：

1. What kinds of things are in theList?
2. What is the significance of the zeroth subscript of an item in theList?
3. What is the significance of the value 4?
4. How would I use the list being returned?

---

> 1. theList 中是什么类型的东西？
> 2. theList 零下标条目的意义是什么？
> 3. 值 4 的意义是什么？
> 4. 我怎么使用返回的列表？

The answers to these questions are not present in the code sample, but they could have been. Say that we’re working in a mine sweeper game. We find that the board is a list of cells called theList. Let’s rename that to gameBoard.

> 问题的答案没体现在代码段中，可那就是它们该在的地方。比方说，我们在开发一种扫雷游戏，我们发现，盘面是名为 theList 的单元格列表，那就将其名称改为 gameBoard。

Each cell on the board is represented by a simple array. We further find that the zeroth subscript is the location of a status value and that a status value of 4 means “flagged.” Just by giving these concepts names we can improve the code considerably:

> 盘面上每个单元格都用一个简单数组表示。我们还发现，零下标条目是一种状态值，而该种状态值为 4 表示“已标记”。只要改为有意义的名称，代码就会得到相当程度的改进：

```java
public List<int[]> getFlaggedCells() {
  List<int[]> flaggedCells = new ArrayList<int[]>();
  for (int[] cell : gameBoard)
  if (cell[STATUS_VALUE] == FLAGGED)
    flaggedCells.add(cell);
  return flaggedCells;
}
```

Notice that the simplicity of the code has not changed. It still has exactly the same number of operators and constants, with exactly the same number of nesting levels. But the code has become much more explicit.

> 注意，代码的简洁性并未被触及。运算符和常量的数量全然保持不变，嵌套数量也全然保持不变。但代码变得明确多了。

We can go further and write a simple class for cells instead of using an array of ints. It can include an intention-revealing function (call it isFlagged) to hide the magic numbers. It results in a new version of the function:

> 还可以更进一步，不用 int 数组表示单元格，而是另写一个类。该类包括一个名副其实的函数（称为 isFlagged），从而掩盖住那个魔术数[1]。于是得到函数的新版本：

```java
public List<Cell> getFlaggedCells() {
  List<Cell> flaggedCells = new ArrayList<Cell>();
  for (Cell cell : gameBoard)
    if (cell.isFlagged())
      flaggedCells.add(cell);
  return flaggedCells;
}
```

With these simple name changes, it’s not difficult to understand what’s going on. This is the power of choosing good names.

> 只要简单改一下名称，就能轻易知道发生了什么。这就是选用好名称的力量。

## 2.3 AVOID DISINFORMATION 避免误导

Programmers must avoid leaving false clues that obscure the meaning of code. We should avoid words whose entrenched meanings vary from our intended meaning. For example, hp, aix, and sco would be poor variable names because they are the names of Unix platforms or variants. Even if you are coding a hypotenuse and hp looks like a good abbreviation, it could be disinformative.

> 程序员必须避免留下掩藏代码本意的错误线索。应当避免使用与本意相悖的词。例如，hp、aix 和 sco 都不该用做变量名，因为它们都是 UNIX 平台或类 UNIX 平台的专有名称。即便你是在编写三角计算程序， hp 看起来是个不错的缩写[2]，但那也可能会提供错误信息。

Do not refer to a grouping of accounts as an accountList unless it’s actually a List. The word list means something specific to programmers. If the container holding the accounts is not actually a List, it may lead to false conclusions.1 So accountGroup or bunchOfAccounts or just plain accounts would be better.

> 别用 accountList 来指称一组账号，除非它真的是 List 类型。List 一词对程序员有特殊意义。如果包纳账号的容器并非真是个 List，就会引起错误的判断[3]。所以，用 accountGroup 或 bunchOfAccounts，甚至直接用 accounts 都会好一些。

1. As we’ll see later on, even if the container is a List, it’s probably better not to encode the container type into the name.

Beware of using names which vary in small ways. How long does it take to spot the subtle difference between a XYZControllerForEfficientHandlingOfStrings in one module and, somewhere a little more distant, XYZControllerForEfficientStorageOfStrings? The words have frightfully similar shapes.

> 提防使用不同之处较小的名称。想区分模块中某处的 XYZControllerFor EfficientHandlingOfStrings 和另一处的 XYZControllerForEfficientStorageOfStrings，会花多长时间呢？这两个词外形实在太相似了。

Spelling similar concepts similarly is information. Using inconsistent spellings is disinformation. With modern Java environments we enjoy automatic code completion. We write a few characters of a name and press some hotkey combination (if that) and are rewarded with a list of possible completions for that name. It is very helpful if names for very similar things sort together alphabetically and if the differences are very obvious, because the developer is likely to pick an object by name without seeing your copious comments or even the list of methods supplied by that class.

> 以同样的方式拼写出同样的概念才是信息。拼写前后不一致就是误导。我们很享受现代 Java 编程环境的自动代码完成特性。键入某个名称的前几个字母，按一下某个热键组合（如果有的话），就能得到一列该名称的可能形式。假如相似的名称依字母顺序放在一起，且差异很明显，那就会相当有助益，因为程序员多半会压根不看你的详细注释，甚至不看该类的方法列表就直接看名字挑一个对象。

A truly awful example of disinformative names would be the use of lower-case L or uppercase O as variable names, especially in combination. The problem, of course, is that they look almost entirely like the constants one and zero, respectively.

> 误导性名称真正可怕的例子，是用小写字母 l 和大写字母 O 作为变量名，尤其是在组合使用的时候。当然，问题在于它们看起来完全像是常量“壹”和“零”。

```java
int a = l;
if ( O == l )
  a = O1;
else
  l = 01;
```

The reader may think this a contrivance, but we have examined code where such things were abundant. In one case the author of the code suggested using a different font so that the differences were more obvious, a solution that would have to be passed down to all future developers as oral tradition or in a written document. The problem is conquered with finality and without creating new work products by a simple renaming.

> 读者可能会认为这纯属虚构，但我们确曾见过充斥这类玩意的代码。有一次，代码作者建议用不同字体写变量名，好显得更清楚些，不过这种方案得要通过口头和书面传递给未来所有的开发者才行。后来，只是做了简单的重命名操作，就解决了问题，而且也没搞出别的事。

## 2.4 MAKE MEANINGFUL DISTINCTIONS 做有意义的区分

![](figures/ch2/2_2fig_martin.jpg)

Programmers create problems for themselves when they write code solely to satisfy a compiler or interpreter. For example, because you can’t use the same name to refer to two different things in the same scope, you might be tempted to change one name in an arbitrary way. Sometimes this is done by misspelling one, leading to the surprising situation where correcting spelling errors leads to an inability to compile.2

> 如果程序员只是为满足编译器或解释器的需要而写代码，就会制造麻烦。例如，因为同一作用范围内两样不同的东西不能重名，你可能会随手改掉其中一个的名称。有时干脆以错误的拼写充数，结果就是出现在更正拼写错误后导致编译器出错的情况。

2. Consider, for example, the truly hideous practice of creating a variable named klass just because the name class was used for something else.

It is not sufficient to add number series or noise words, even though the compiler is satisfied. If names must be different, then they should also mean something different.

> 光是添加数字系列或是废话远远不够，即便这足以让编译器满意。如果名称必须相异，那其意思也应该不同才对。

Number-series naming (a1, a2, .. aN) is the opposite of intentional naming. Such names are not disinformative—they are noninformative; they provide no clue to the author’s intention. Consider:

> 以数字系列命名（a1、a2，……aN）是依义命名的对立面。这样的名称纯属误导——完全没有提供正确信息；没有提供导向作者意图的线索。试看：

```java
public static void copyChars(char a1[], char a2[]) {
  for (int i = 0; i < a1.length; i++) {
    a2[i] = a1[i];
  }
}
```

This function reads much better when source and destination are used for the argument names.

> 如果参数名改为 source 和 destination，这个函数就会像样许多。

Noise words are another meaningless distinction. Imagine that you have a Product class. If you have another called ProductInfo or ProductData, you have made the names different without making them mean anything different. Info and Data are indistinct noise words like a, an, and the.

> 废话是另一种没意义的区分。假设你有一个 Product 类。如果还有一个 ProductInfo 或 ProductData 类，那它们的名称虽然不同，意思却无区别。Info 和 Data 就像 a、an 和 the 一样，是意义含混的废话。

Note that there is nothing wrong with using prefix conventions like a and the so long as they make a meaningful distinction. For example you might use a for all local variables and the for all function arguments.3 The problem comes in when you decide to call a variable theZork because you already have another variable named zork.

> 注意，只要体现出有意义的区分，使用 a 和 the 这样的前缀就没错。例如，你可能把 a 用在域内变量，而把 the 用于函数参数[5]。但如果你已经有一个名为 zork 的变量，又想调用一个名为 theZork 的变量，麻烦就来了。

3. Uncle Bob used to do this in C++ but has given up the practice because modern IDEs make it unnecessary.

Noise words are redundant. The word variable should never appear in a variable name. The word table should never appear in a table name. How is NameString better than Name? Would a Name ever be a floating point number? If so, it breaks an earlier rule about disinformation. Imagine finding one class named Customer and another named CustomerObject. What should you understand as the distinction? Which one will represent the best path to a customer’s payment history?

> 废话都是冗余。Variable 一词永远不应当出现在变量名中。Table 一词永远不应当出现在表名中。NameString 会比 Name 好吗？难道 Name 会是一个浮点数不成？如果是这样，就触犯了关于误导的规则。设想有个名为 Customer 的类，还有一个名为 CustomerObject 的类。区别何在呢？哪一个是表示客户历史支付情况的最佳途径？

There is an application we know of where this is illustrated. we’ve changed the names to protect the guilty, but here’s the exact form of the error:

> 有个应用反映了这种状况。为当事者讳，我们改了一下，不过犯错的代码的确就是这个样子：

```java
getActiveAccount();
getActiveAccounts();
getActiveAccountInfo();
```

How are the programmers in this project supposed to know which of these functions to call?

> 程序员怎么能知道该调用哪个函数呢？

In the absence of specific conventions, the variable moneyAmount is indistinguishable from money, customerInfo is indistinguishable from customer, accountData is indistinguishable from account, and theMessage is indistinguishable from message. Distinguish names in such a way that the reader knows what the differences offer.

> 如果缺少明确约定，变量 moneyAmount 就与 money 没区别， customerInfo 与 customer 没区别，accountData 与 account 没区别， theMessage 也与 message 没区别。要区分名称，就要以读者能鉴别不同之处的方式来区分。

## 2.5 USE PRONOUNCEABLE NAMES 使用读得出来的名称

Humans are good at words. A significant part of our brains is dedicated to the concept of words. And words are, by definition, pronounceable. It would be a shame not to take advantage of that huge portion of our brains that has evolved to deal with spoken language. So make your names pronounceable.

> 人类长于记忆和使用单词。大脑的相当一部分就是用来容纳和处理单词的。单词能读得出来。人类进化到大脑中有那么大的一块地方用来处理言语，若不善加利用，实在是种耻辱。

If you can’t pronounce it, you can’t discuss it without sounding like an idiot. “Well, over here on the bee cee arr three cee enn tee we have a pee ess zee kyew int, see?” This matters because programming is a social activity.

> 如果名称读不出来，讨论的时候就会像个傻鸟。“哎，这儿，鼻涕阿三喜摁踢（bee cee arr three cee enn tee）[6]上头，有个皮挨死极翘（pee ess zee kyew）[7]整数，看见没？”这不是小事，因为编程本就是一种社会活动。

A company I know has genymdhms (generation date, year, month, day, hour, minute, and second) so they walked around saying “gen why emm dee aich emm ess”. I have an annoying habit of pronouncing everything as written, so I started saying “gen-yah-muddahims.” It later was being called this by a host of designers and analysts, and we still sounded silly. But we were in on the joke, so it was fun. Fun or not, we were tolerating poor naming. New developers had to have the variables explained to them, and then they spoke about it in silly made-up words instead of using proper English terms. Compare

> 有家公司，程序里面写了个 genymdhms（生成日期，年、月、日、时、分、秒），他们一般读作“gen why emm dee aich emm ess”[8]。我有个见字照读的恶习，于是开口就念“gen-yah-mudda-hims”。后来好些设计师和分析师都有样学样，听起来傻乎乎的。我们知道典故，所以会觉得很搞笑。搞笑归搞笑，实际是在强忍糟糕的命名。在给新开发者解释变量的意义时，他们总是读出傻乎乎的自造词，而非恰当的英语词。比较

```java
class DtaRcrd102 {
  private Date genymdhms;
  private Date modymdhms;
  private final String pszqint = ”102”;
  /* … */
};
```

to

> 和

```java
class Customer {
  private Date generationTimestamp;
  private Date modificationTimestamp;;
  private final String recordId = ”102”;
  /* … */
};
```

Intelligent conversation is now possible: “Hey, Mikey, take a look at this record! The generation timestamp is set to tomorrow’s date! How can that be?”

现在读起来就像人话了：“喂，Mikey，看看这条记录！生成时间戳（generation timestamp） [9]被设置为明天了！不能这样吧？”

## 2.6 USE SEARCHABLE NAMES 使用可搜索的名称

Single-letter names and numeric constants have a particular problem in that they are not easy to locate across a body of text.

> 单字母名称和数字常量有个问题，就是很难在一大篇文字中找出来。

One might easily grep for MAX_CLASSES_PER_STUDENT, but the number 7 could be more troublesome. Searches may turn up the digit as part of file names, other constant definitions, and in various expressions where the value is used with different intent. It is even worse when a constant is a long number and someone might have transposed digits, thereby creating a bug while simultaneously evading the programmer’s search.

> 找 MAX_CLASSES_PER_STUDENT 很容易，但想找数字 7 就麻烦了，它可能是某些文件名或其他常量定义的一部分，出现在因不同意图而采用的各种表达式中。如果该常量是个长数字，又被人错改过，就会逃过搜索，从而造成错误。

Likewise, the name e is a poor choice for any variable for which a programmer might need to search. It is the most common letter in the English language and likely to show up in every passage of text in every program. In this regard, longer names trump shorter names, and any searchable name trumps a constant in code.

> 同样，e 也不是个便于搜索的好变量名。它是英文中最常用的字母，在每个程序、每段代码中都有可能出现。由此而见，长名称胜于短名称，搜得到的名称胜于用自造编码代写就的名称。

My personal preference is that single-letter names can ONLY be used as local variables inside short methods. The length of a name should correspond to the size of its scope [N5]. If a variable or constant might be seen or used in multiple places in a body of code, it is imperative to give it a search-friendly name. Once again compare

> 窃以为单字母名称仅用于短方法中的本地变量。名称长短应与其作用域大小相对应[N5]。若变量或常量可能在代码中多处使用，则应赋其以便于搜索的名称。再比较

```java
for (int j=0; j<34; j++) {
  s += (t[j]*4)/5;
}
```

to

> 和

```java
int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;
for (int j=0; j < NUMBER_OF_TASKS; j++) {
  int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
  int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
  sum += realTaskWeeks;
}
```

Note that sum, above, is not a particularly useful name but at least is searchable. The intentionally named code makes for a longer function, but consider how much easier it will be to find WORK_DAYS_PER_WEEK than to find all the places where 5 was used and filter the list down to just the instances with the intended meaning.

> 注意，上面代码中的 sum 并非特别有用的名称，不过它至少搜得到。采用能表达意图的名称，貌似拉长了函数代码，但要想想看，WORK_DAYS_PER_WEEK 要比数字 5 好找得多，而列表中也只剩下了体现作者意图的名称。

## 2.7 AVOID ENCODINGS 避免使用编码

We have enough encodings to deal with without adding more to our burden. Encoding type or scope information into names simply adds an extra burden of deciphering. It hardly seems reasonable to require each new employee to learn yet another encoding “language” in addition to learning the (usually considerable) body of code that they’ll be working in. It is an unnecessary mental burden when trying to solve a problem. Encoded names are seldom pronounceable and are easy to mis-type.

> 编码已经太多，无谓再自找麻烦。把类型或作用域编进名称里面，徒然增加了解码的负担。没理由要求每位新人都在弄清要应付的代码之外（那算是正常的），还要再搞懂另一种编码“语言”。这对于解决问题而言，纯属多余的负担。带编码的名称通常也不便发音，容易打错。

### 2.7.1 Hungarian Notation 匈牙利语标记法

In days of old, when we worked in name-length-challenged languages, we violated this rule out of necessity, and with regret. Fortran forced encodings by making the first letter a code for the type. Early versions of BASIC allowed only a letter plus one digit. Hungarian Notation (HN) took this to a whole new level.

> 在往昔名称长短很要命的时代，我们毫无必要地破坏了不编码的规矩，如今后悔不迭。Fortran 语言要求首字母体现出类型，导致了编码的产生。BASIC 早期版本只允许使用一个字母再加上一位数字。匈牙利语标记法（Hungarian Notation，HN）将这种态势愈演愈烈。

HN was considered to be pretty important back in the Windows C API, when everything was an integer handle or a long pointer or a void pointer, or one of several implementations of “string” (with different uses and attributes). The compiler did not check types in those days, so the programmers needed a crutch to help them remember the types.

> 在 Windows 的 C 语言 API 的时代，HN 相当重要，那时所有名称要么是个整数句柄，要么是个长指针或者 void 指针，要不然就是 string 的几种实现（有不同的用途和属性）之一。那时候编译器并不做类型检查，程序员需要匈牙利语标记法来帮助自己记住类型。

In modern languages we have much richer type systems, and the compilers remember and enforce the types. What’s more, there is a trend toward smaller classes and shorter functions so that people can usually see the point of declaration of each variable they’re using.

> 现代编程语言具有更丰富的类型系统，编译器也记得并强制使用类型。而且，人们趋向于使用更小的类、更短的方法，好让每个变量的定义都在视野范围之内。

Java programmers don’t need type encoding. Objects are strongly typed, and editing environments have advanced such that they detect a type error long before you can run a compile! So nowadays HN and other forms of type encoding are simply impediments. They make it harder to change the name or type of a variable, function, or class. They make it harder to read the code. And they create the possibility that the encoding system will mislead the reader.

> Java 程序员不需要类型编码。对象是强类型的，代码编辑环境已经先进到在编译开始前就侦测到类型错误的程度！所以，如今 HN 和其他类型编码形式都纯属多余。它们增加了修改变量、函数或类的名称或类型的难度。它们增加了阅读代码的难度。它们制造了让编码系统误导读者的可能性。

```java
PhoneNumber phoneString;
// name not changed when type changed!
```

### 2.7.2 Member Prefixes 成员前缀

You also don’t need to prefix member variables with m\_ anymore. Your classes and functions should be small enough that you don’t need them. And you should be using an editing environment that highlights or colorizes members to make them distinct.

> 也不必用 m\_前缀来标明成员变量。应当把类和函数做得足够小，消除对成员前缀的需要。你应当使用某种可以高亮或用颜色标出成员的编辑环境。

```java
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
```

Besides, people quickly learn to ignore the prefix (or suffix) to see the meaningful part of the name. The more we read the code, the less we see the prefixes. Eventually the prefixes become unseen clutter and a marker of older code.

> 此外，人们会很快学会无视前缀（或后缀），只看到名称中有意义的部分。代码读得越多，眼中就越没有前缀。最终，前缀变作了不入法眼的废料，变作了旧代码的标志物。

### 2.7.3 Interfaces and Implementations 接口和实现

These are sometimes a special case for encodings. For example, say you are building an ABSTRACT FACTORY for the creation of shapes. This factory will be an interface and will be implemented by a concrete class. What should you name them? IShapeFactory and ShapeFactory? I prefer to leave interfaces unadorned. The preceding I, so common in today’s legacy wads, is a distraction at best and too much information at worst. I don’t want my users knowing that I’m handing them an interface. I just want them to know that it’s a ShapeFactory. So if I must encode either the interface or the implementation, I choose the implementation. Calling it ShapeFactoryImp, or even the hideous CShapeFactory, is preferable to encoding the interface.

> 有时也会出现采用编码的特殊情形。比如，你在做一个创建形状用的抽象工厂（Abstract Factory）。该工厂是个接口，要用具体类来实现。你怎么来命名工厂和具体类呢？IShapeFactory 和 ShapeFactory 吗？我喜欢不加修饰的接口。前导字母 I 被滥用到了说好听点是干扰，说难听点根本就是废话的程度。我不想让用户知道我给他们的是接口。我就想让他们知道那是个 ShapeFactory。如果接口和实现必须选一个来编码的话，我宁肯选择实现。ShapeFactoryImp，甚至是丑陋的 CShapeFactory，都比对接口名称编码来得好。

## 2.8 AVOID MENTAL MAPPING 避免思维映射

Readers shouldn’t have to mentally translate your names into other names they already know. This problem generally arises from a choice to use neither problem domain terms nor solution domain terms.

> 不应当让读者在脑中把你的名称翻译为他们熟知的名称。这种问题经常出现在选择是使用问题领域术语还是解决方案领域术语时。

This is a problem with single-letter variable names. Certainly a loop counter may be named i or j or k (though never l!) if its scope is very small and no other names can conflict with it. This is because those single-letter names for loop counters are traditional. However, in most other contexts a single-letter name is a poor choice; it’s just a place holder that the reader must mentally map to the actual concept. There can be no worse reason for using the name c than because a and b were already taken.

> 单字母变量名就是个问题。在作用域较小、也没有名称冲突时，循环计数器自然有可能被命名为 i 或 j 或 k。（但千万别用字母 l！）这是因为传统上惯用单字母名称做循环计数器。然而，在多数其他情况下，单字母名称不是个好选择；读者必须在脑中将它映射为真实概念。仅仅是因为有了 a 和 b，就要取名为 c，实在并非像样的理由。

In general programmers are pretty smart people. Smart people sometimes like to show off their smarts by demonstrating their mental juggling abilities. After all, if you can reliably remember that r is the lower-cased version of the url with the host and scheme removed, then you must clearly be very smart.

> 程序员通常都是聪明人。聪明人有时会借脑筋急转弯炫耀其聪明。总而言之，假使你记得 r 代表不包含主机名和图式（scheme）的小写字母版 url 的话，那你真是太聪明了。

One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand.

> 聪明程序员和专业程序员之间的区别在于，专业程序员了解，明确是王道。专业程序员善用其能，编写其他人能理解的代码。

## 2.9 CLASS NAMES 类名

Classes and objects should have noun or noun phrase names like Customer, WikiPage, Account, and AddressParser. Avoid words like Manager, Processor, Data, or Info in the name of a class. A class name should not be a verb.

> 类名和对象名应该是名词或名词短语，如 Customer、WikiPage、Account 和 AddressParser。避免使用 Manager、Processor、Data 或 Info 这样的类名。类名不应当是动词。

## 2.10 METHOD NAMES 方法名

Methods should have verb or verb phrase names like postPayment, deletePage, or save. Accessors, mutators, and predicates should be named for their value and prefixed with get, set, and is according to the javabean standard.4

> 方法名应当是动词或动词短语，如 postPayment、deletePage 或 save。属性访问器、修改器和断言应该根据其值命名，并依 Javabean 标准[10]加上 get、set 和 is 前缀。

4. http://java.sun.com/products/javabeans/docs/spec.html

```java
string name = employee.getName();
customer.setName(”mike”);
if (paycheck.isPosted())…
```

When constructors are overloaded, use static factory methods with names that describe the arguments. For example,

> 重载构造器时，使用描述了参数的静态工厂方法名。例如，

```java
Complex fulcrumPoint = Complex.FromRealNumber(23.0);
```

is generally better than

> 通常好于

```java
Complex fulcrumPoint = new Complex(23.0);
```

Consider enforcing their use by making the corresponding constructors private.

> 可以考虑将相应的构造器设置为 private，强制使用这种命名手段。

## 2.11 ON’T BE CUTE 别扮可爱

If names are too clever, they will be memorable only to people who share the author’s sense of humor, and only as long as these people remember the joke. Will they know what the function named HolyHandGrenade is supposed to do? Sure, it’s cute, but maybe in this case DeleteItems might be a better name. Choose clarity over entertainment value.

> 如果名称太耍宝，那就只有同作者一般有幽默感的人才能记得住，而且还是在他们记得那个笑话的时候才行。谁会知道名为 HolyHandGrenade[11]的函数是用来做什么的呢？没错，这名字挺伶俐，不过 DeleteItems[12]或许是更好的名称。宁可明确，毋为好玩。

![](figures/ch2/2_3fig_martin.jpg)

Cuteness in code often appears in the form of colloquialisms or slang. For example, don’t use the name whack() to mean kill(). Don’t tell little culture-dependent jokes like eatMyShorts() to mean abort().

> 扮可爱的做法在代码中经常体现为使用俗话或俚语。例如，别用 whack( )[13]来表示 kill( )。别用 eatMyShorts( )[14]这类与文化紧密相关的笑话来表示 abort( )。

Say what you mean. Mean what you say.

> 言到意到。意到言到。

## 2.12 PICK ONE WORD PER CONCEPT 每个概念对应一个词

Pick one word for one abstract concept and stick with it. For instance, it’s confusing to have fetch, retrieve, and get as equivalent methods of different classes. How do you remember which method name goes with which class? Sadly, you often have to remember which company, group, or individual wrote the library or class in order to remember which term was used. Otherwise, you spend an awful lot of time browsing through headers and previous code samples.

> 给每个抽象概念选一个词，并且一以贯之。例如，使用 fetch、 retrieve 和 get 来给在多个类中的同种方法命名。你怎么记得住哪个类中是哪个方法呢？很悲哀，你总得记住编写库或类的公司、机构或个人，才能想得起来用的是哪个术语。否则，就得耗费大把时间浏览各个文件头及前面的代码。

Modern editing environments like Eclipse and IntelliJ provide context-sensitive clues, such as the list of methods you can call on a given object. But note that the list doesn’t usually give you the comments you wrote around your function names and parameter lists. You are lucky if it gives the parameter names from function declarations. The function names have to stand alone, and they have to be consistent in order for you to pick the correct method without any additional exploration.

> Eclipse 和 IntelliJ 之类现代编程环境提供了与环境相关的线索，比如某个对象能调用的方法列表。不过要注意，列表中通常不会给出你为函数名和参数列表编写的注释。如果参数名称来自函数声明，你就太幸运了。函数名称应当独一无二，而且要保持一致，这样你才能不借助多余的浏览就找到正确的方法。

Likewise, it’s confusing to have a controller and a manager and a driver in the same code base. What is the essential difference between a DeviceManager and a Protocol-Controller? Why are both not controllers or both not managers? Are they both Drivers really? The name leads you to expect two objects that have very different type as well as having different classes.

> 同样，在同一堆代码中有 controller，又有 manager，还有 driver，就会令人困惑。DeviceManager 和 Protocol-Controller 之间有何根本区别？为什么不全用 controllers 或 managers？他们都是 Drivers 吗？这种名称，让人觉得这两个对象是不同类型的，也分属不同的类。

A consistent lexicon is a great boon to the programmers who must use your code.

> 对于那些会用到你代码的程序员，一以贯之的命名法简直就是天降福音。

## 2.13 DON’T PUN 别用双关语

Avoid using the same word for two purposes. Using the same term for two different ideas is essentially a pun.

> 避免将同一单词用于不同目的。同一术语用于不同概念，基本上就是双关语了。

If you follow the “one word per concept” rule, you could end up with many classes that have, for example, an add method. As long as the parameter lists and return values of the various add methods are semantically equivalent, all is well.

> 如果遵循“一词一义”规则，可能在好多个类里面都会有 add 方法。只要这些 add 方法的参数列表和返回值在语义上等价，就一切顺利。

However one might decide to use the word add for “consistency” when he or she is not in fact adding in the same sense. Let’s say we have many classes where add will create a new value by adding or concatenating two existing values. Now let’s say we are writing a new class that has a method that puts its single parameter into a collection. Should we call this method add? It might seem consistent because we have so many other add methods, but in this case, the semantics are different, so we should use a name like insert or append instead. To call the new method add would be a pun.

> 但是，可能会有人决定为“保持一致”而使用 add 这个词来命名，即便并非真的想表示这种意思。比如，在多个类中都有 add 方法，该方法通过增加或连接两个现存值来获得新值。假设要写个新类，该类中有一个方法，把单个参数放到群集（collection）中。该把这个方法叫做 add 吗？这样做貌似和其他 add 方法保持了一致，但实际上语义却不同，应该用 insert 或 append 之类词来命名才对。把该方法命名为 add，就是双关语了。

Our goal, as authors, is to make our code as easy as possible to understand. We want our code to be a quick skim, not an intense study. We want to use the popular paperback model whereby the author is responsible for making himself clear and not the academic model where it is the scholar’s job to dig the meaning out of the paper.

> 代码作者应尽力写出易于理解的代码。我们想把代码写得让别人能一目尽览，而不必殚精竭虑地研究。我们想要那种大众化的作者尽责写清楚的平装书模式；我们不想要那种学者挖地三尺才能明白个中意义的学院派模式。

## 2.14 USE SOLUTION DOMAIN NAMES 使用解决方案领域名称

Remember that the people who read your code will be programmers. So go ahead and use computer science (CS) terms, algorithm names, pattern names, math terms, and so forth. It is not wise to draw every name from the problem domain because we don’t want our coworkers to have to run back and forth to the customer asking what every name means when they already know the concept by a different name.

> 记住，只有程序员才会读你的代码。所以，尽管用那些计算机科学（Computer Science，CS）术语、算法名、模式名、数学术语吧。依据问题所涉领域来命名可不算是聪明的做法，因为不该让协作者老是跑去问客户每个名称的含义，其实他们早该通过另一名称了解这个概念了。对于熟悉访问者（VISITOR）模式的程序来说，名称 AccountVisitor 富有意义。哪个程序员会不知道 JobQueue 的意思呢？程序员要做太多技术性工作。给这些事取个技术性的名称，通常是最靠谱的做法。

The name AccountVisitor means a great deal to a programmer who is familiar with the VISITOR pattern. What programmer would not know what a JobQueue was? There are lots of very technical things that programmers have to do. Choosing technical names for those things is usually the most appropriate course.

## 2.15 USE PROBLEM DOMAIN NAMES 使用源自所涉问题领域的名称

When there is no “programmer-eese” for what you’re doing, use the name from the problem domain. At least the programmer who maintains your code can ask a domain expert what it means.

> 如果不能用程序员熟悉的术语来给手头的工作命名，就采用从所涉问题领域而来的名称吧。至少，负责维护代码的程序员就能去请教领域专家了。

Separating solution and problem domain concepts is part of the job of a good programmer and designer. The code that has more to do with problem domain concepts should have names drawn from the problem domain.

> 优秀的程序员和设计师，其工作之一就是分离解决方案领域和问题领域的概念。与所涉问题领域更为贴近的代码，应当采用源自问题领域的名称。

## 2.16 ADD MEANINGFUL CONTEXT 添加有意义的语境

There are a few names which are meaningful in and of themselves—most are not. Instead, you need to place names in context for your reader by enclosing them in well-named classes, functions, or namespaces. When all else fails, then prefixing the name may be necessary as a last resort.

> 很少有名称是能自我说明的——多数都不能。反之，你需要用有良好命名的类、函数或名称空间来放置名称，给读者提供语境。如果没这么做，给名称添加前缀就是最后一招了。

Imagine that you have variables named firstName, lastName, street, houseNumber, city, state, and zipcode. Taken together it’s pretty clear that they form an address. But what if you just saw the state variable being used alone in a method? Would you automatically infer that it was part of an address?

> 设想你有名为 firstName、lastName、street、houseNumber、city、state 和 zipcode 的变量。当它们搁一块儿的时候，很明确是构成了一个地址。不过，假使只是在某个方法中看见孤零零一个 state 变量呢？你会理所当然推断那是某个地址的一部分吗？

You can add context by using prefixes: addrFirstName, addrLastName, addrState, and so on. At least readers will understand that these variables are part of a larger structure. Of course, a better solution is to create a class named Address. Then, even the compiler knows that the variables belong to a bigger concept.

> 可以添加前缀 addrFirstName、addrLastName、addrState 等，以此提供语境。至少，读者会明白这些变量是某个更大结构的一部分。当然，更好的方案是创建名为 Address 的类。这样，即便是编译器也会知道这些变量隶属某个更大的概念了。

Consider the method in Listing 2-1. Do the variables need a more meaningful context? The function name provides only part of the context; the algorithm provides the rest. Once you read through the function, you see that the three variables, number, verb, and pluralModifier, are part of the “guess statistics” message. Unfortunately, the context must be inferred. When you first look at the method, the meanings of the variables are opaque.

> 看看代码清单 2-1 中的方法。以下变量是否需要更有意义的语境呢？函数名仅给出了部分语境；算法提供了剩下的部分。遍览函数后，你会知道 number、verb 和 pluralModifier 这三个变量是“测估”信息的一部分。不幸的是这语境得靠读者推断出来。第一眼看到这个方法时，这些变量的含义完全不清楚。

Listing 2-1 Variables with unclear context.

> 代码清单 2-1 语境不明确的变量

```java
private void printGuessStatistics(char candidate, int count) {
  String number;
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
```

The function is a bit too long and the variables are used throughout. To split the function into smaller pieces we need to create a GuessStatisticsMessage class and make the three variables fields of this class. This provides a clear context for the three variables. They are definitively part of the GuessStatisticsMessage. The improvement of context also allows the algorithm to be made much cleaner by breaking it into many smaller functions. (See Listing 2-2.)

> 上列函数有点儿过长，变量的使用贯穿始终。要分解这个函数，需要创建一个名为 GuessStatisticsMessage 的类，把三个变量做成该类的成员字段。这样它们就在定义上变作了 GuessStatisticsMessage 的一部分。语境的增强也让算法能够通过分解为更小的函数而变得更为干净利落。

Listing 2-2 Variables have a context.

> （如代码清单 2-2 所示。）代码清单

```java
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
```

## 2.17 DON’T ADD GRATUITOUS CONTEXT 不要添加没用的语境

In an imaginary application called “Gas Station Deluxe,” it is a bad idea to prefix every class with GSD. Frankly, you are working against your tools. You type G and press the completion key and are rewarded with a mile-long list of every class in the system. Is that wise? Why make it hard for the IDE to help you?

> 设若有一个名为“加油站豪华版”（Gas Station Deluxe）的应用，在其中给每个类添加 GSD 前缀就不是什么好点子。说白了，你是在和自己在用的工具过不去。输入 G，按下自动完成键，结果会得到系统中全部类的列表，列表恨不得有一英里那么长。这样做聪明吗？为什么要搞得 IDE 没法帮助你？

Likewise, say you invented a MailingAddress class in GSD’s accounting module, and you named it GSDAccountAddress. Later, you need a mailing address for your customer contact application. Do you use GSDAccountAddress? Does it sound like the right name? Ten of 17 characters are redundant or irrelevant.

> 再比如，你在 GSD 应用程序中的记账模块创建了一个表示邮件地址的类，然后给该类命名为 GSDAccountAddress。稍后，你的客户联络应用中需要用到邮件地址，你会用 GSDAccountAddress 吗？这名字听起来没问题吗？在这 17 个字母里面，有 10 个字母纯属多余和与当前语境毫无关联。

Shorter names are generally better than longer ones, so long as they are clear. Add no more context to a name than is necessary.

> 只要短名称足够清楚，就要比长名称好。别给名称添加不必要的语境。

The names accountAddress and customerAddress are fine names for instances of the class Address but could be poor names for classes. Address is a fine name for a class. If I need to differentiate between MAC addresses, port addresses, and Web addresses, I might consider PostalAddress, MAC, and URI. The resulting names are more precise, which is the point of all naming.

> 对于 Address 类的实体来说，accountAddress 和 customerAddress 都是不错的名称，不过用在类名上就不太好了。Address 是个好类名。如果需要与 MAC 地址、端口地址和 Web 地址相区别，我会考虑使用 PostalAddress、MAC 和 URI。这样的名称更为精确，而精确正是命名的要点。

## 2.18 FINAL WORDS 最后的话

The hardest thing about choosing good names is that it requires good descriptive skills and a shared cultural background. This is a teaching issue rather than a technical, business, or management issue. As a result many people in this field don’t learn to do it very well.

> 取好名字最难的地方在于需要良好的描述技巧和共有文化背景。与其说这是一种技术、商业或管理问题，还不如说是一种教学问题。其结果是，这个领域内的许多人都没能学会做得很好。

People are also afraid of renaming things for fear that some other developers will object. We do not share that fear and find that we are actually grateful when names change (for the better). Most of the time we don’t really memorize the names of classes and methods. We use the modern tools to deal with details like that so we can focus on whether the code reads like paragraphs and sentences, or at least like tables and data structure (a sentence isn’t always the best way to display data). You will probably end up surprising someone when you rename, just like you might with any other code improvement. Don’t let it stop you in your tracks.

> 我们有时会怕其他开发者反对重命名。如果讨论一下就知道，如果名称改得更好，那大家真的会感激你。多数时候我们并不记忆类名和方法名。我们使用现代工具对付这些细节，好让自己集中精力于把代码写得就像词句篇章、至少像是表和数据结构（词句并非总是呈现数据的最佳手段）。改名可能会让某人吃惊，就像你做到其他代码改善工作一样。别让这种事阻碍你的前进步伐。

Follow some of these rules and see whether you don’t improve the readability of your code. If you are maintaining someone else’s code, use refactoring tools to help resolve these problems. It will pay off in the short term and continue to pay in the long run.

> 不妨试试上面这些规则，看你的代码可读性是否有所提升。如果你是在维护别人写的代码，使用重构工具来解决问题。效果立竿见影，而且会持续下去。
