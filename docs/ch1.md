# 第 1 章 Clean Code 整洁代码

![](figures/ch1/1-1fig_martin.jpg)

You are reading this book for two reasons. First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers.

> 阅读本书有两种原因：第一，你是个程序员；第二，你想成为更好的程序员。很好。我们需要更好的程序员。

This is a book about good programming. It is filled with code. We are going to look at code from every different direction. We’ll look down at it from the top, up at it from the bottom, and through it from the inside out. By the time we are done, we’re going to know a lot about code. What’s more, we’ll be able to tell the difference between good code and bad code. We’ll know how to write good code. And we’ll know how to transform bad code into good code.

> 这是本有关编写好程序的书。它充斥着代码。我们要从各个方向来考察这些代码。从顶向下，从底往上，从里而外。读完后，就能知道许多关于代码的事了。而且，我们还能说出好代码和糟糕的代码之间的差异。我们将了解到如何写出好代码。我们也会知道，如何将糟糕的代码改成好代码。

## 1.1 THERE WILL BE CODE 要有代码

One might argue that a book about code is somehow behind the times—that code is no longer the issue; that we should be concerned about models and requirements instead. Indeed some have suggested that we are close to the end of code. That soon all code will be generated instead of written. That programmers simply won’t be needed because business people will generate programs from specifications.

> 有人也许会以为，关于代码的书有点儿落后于时代——代码不再是问题；我们应当关注模型和需求。确实，有人说过我们正在临近代码的终结点。很快，代码就会自动产生出来，不需要再人工编写。程序员完全没用了，因为商务人士可以从规约直接生成程序。

Nonsense! We will never be rid of code, because code represents the details of the requirements. At some level those details cannot be ignored or abstracted; they have to be specified. And specifying requirements in such detail that a machine can execute them is programming. Such a specification is code.

> 扯淡！我们永远抛不掉代码，因为代码呈现了需求的细节。在某些层面上，这些细节无法被忽略或抽象，必须明确之。将需求明确到机器可以执行的细节程度，就是编程要做的事。而这种规约正是代码。

I expect that the level of abstraction of our languages will continue to increase. I also expect that the number of domain-specific languages will continue to grow. This will be a good thing. But it will not eliminate code. Indeed, all the specifications written in these higher level and domain-specific language will be code! It will still need to be rigorous, accurate, and so formal and detailed that a machine can understand and execute it.

> 我期望语言的抽象程度继续提升。我也期望领域特定语言的数量继续增加。那会是好事一桩。但那终结不了代码。实际上，在较高层次上用领域特定语言撰写的规约也将是代码！它也得严谨、精确、规范和详细，好让机器理解和执行。

The folks who think that code will one day disappear are like mathematicians who hope one day to discover a mathematics that does not have to be formal. They are hoping that one day we will discover a way to create machines that can do what we want rather than what we say. These machines will have to be able to understand us so well that they can translate vaguely specified needs into perfectly executing programs that precisely meet those needs.

> 那帮以为代码终将消失的伙计，就像是巴望着发现一种无规范数学的数学家们一般。他们巴望着，总有一天能创造出某种机器，我们只要想想、嘴都不用张就能叫它依计行事。那机器要能透彻理解我们，只有这样，它才能把含糊不清的需求翻译为可完美执行的程序，精确满足需求。

This will never happen. Not even humans, with all their intuition and creativity, have been able to create successful systems from the vague feelings of their customers. Indeed, if the discipline of requirements specification has taught us anything, it is that well-specified requirements are as formal as code and can act as executable tests of that code!

> 这种事永远不会发生。即便是人类，倾其全部的直觉和创造力，也造不出满足客户模糊感觉的成功系统来。如果说需求规约原则教给了我们什么，那就是归置良好的需求就像代码一样正式，也能作为代码的可执行测试来使用。

Remember that code is really the language in which we ultimately express the requirements. We may create languages that are closer to the requirements. We may create tools that help us parse and assemble those requirements into formal structures. But we will never eliminate necessary precision—so there will always be code.

> 记住，代码确然是我们最终用来表达需求的那种语言。我们可以创造各种与需求接近的语言。我们可以创造帮助把需求解析和汇整为正式结构的各种工具。然而，我们永远无法抛弃必要的精确性——所以代码永存。

## 1.2 BAD CODE 糟糕的代码

I was recently reading the preface to Kent Beck’s book Implementation Patterns.1 He says, “… this book is based on a rather fragile premise: that good code matters….” A fragile premise? I disagree! I think that premise is one of the most robust, supported, and overloaded of all the premises in our craft (and I think Kent knows it). We know good code matters because we’ve had to deal for so long with its lack.

> 最近我在读 Kent Beck 著 Implementation Patterns（中译版《实现模式》）[1]一书的序言。他这样写道：“……本书基于一种不太牢靠的前提：好代码的确重要……”这前提不牢靠？我反对！我认为这是该领域最强固、最受支持、最被强调的前提了（我想 Kent 也知道）。我们知道好代码重要，是因为其短缺实在困扰了我们太久。

1. [Beck07].

I know of one company that, in the late 80s, wrote a killer app. It was very popular, and lots of professionals bought and used it. But then the release cycles began to stretch. Bugs were not repaired from one release to the next. Load times grew and crashes increased. I remember the day I shut the product down in frustration and never used it again. The company went out of business a short time after that.

> 20 世纪 80 年代末，有家公司写了个很流行的杀手应用，许多专业人士都买来用。然后，发布周期开始拉长。缺陷总是不能修复。装载时间越来越久，崩溃的几率也越来越大。至今我还记得自己在某天沮丧地关掉那个程序，从此再不用它。在那之后不久，该公司就关门大吉了。

![](figures/ch1/1-2fig_martin.jpg)

Two decades later I met one of the early employees of that company and asked him what had happened. The answer confirmed my fears. They had rushed the product to market and had made a huge mess in the code. As they added more and more features, the code got worse and worse until they simply could not manage it any longer. It was the bad code that brought the company down.

> 20 年后，我见到那家公司的一位早期雇员，问他当年发生了什么事。他的回答叫我愈发恐惧起来。原来，当时他们赶着推出产品，代码写得乱七八糟。特性越加越多，代码也越来越烂，最后再也没法管理这些代码了。是糟糕的代码毁了这家公司。

Have you ever been significantly impeded by bad code? If you are a programmer of any experience then you’ve felt this impediment many times. Indeed, we have a name for it. We call it wading. We wade through bad code. We slog through a morass of tangled brambles and hidden pitfalls. We struggle to find our way, hoping for some hint, some clue, of what is going on; but all we see is more and more senseless code.

> 你是否曾为糟糕的代码所深深困扰？如果你是位有点儿经验的程序员，定然多次遇到过这类困境。我们有专用来形容这事的词：沼泽（wading）。我们趟过代码的水域。我们穿过灌木密布、瀑布暗藏的沼泽地。我们拼命想找到出路，期望有点什么线索能启发我们到底发生了什么事；但目光所及，只是越来越多死气沉沉的代码。

Of course you have been impeded by bad code. So then—why did you write it?

> 你当然曾为糟糕的代码所困扰过。那么——为什么要写糟糕的代码呢？

Were you trying to go fast? Were you in a rush? Probably so. Perhaps you felt that you didn’t have time to do a good job; that your boss would be angry with you if you took the time to clean up your code. Perhaps you were just tired of working on this program and wanted it to be over. Or maybe you looked at the backlog of other stuff that you had promised to get done and realized that you needed to slam this module together so you could move on to the next. We’ve all done it.

> 是想快点完成吗？是要赶时间吗？有可能。或许你觉得自己要干好所需的时间不够；假使花时间清理代码，老板就会大发雷霆。或许你只是不耐烦再搞这套程序，期望早点结束。或许你看了看自己承诺要做的其他事，意识到得赶紧弄完手上的东西，好接着做下一件工作。这种事我们都干过。

We’ve all looked at the mess we’ve just made and then have chosen to leave it for another day. We’ve all felt the relief of seeing our messy program work and deciding that a working mess is better than nothing. We’ve all said we’d go back and clean it up later. Of course, in those days we didn’t know LeBlanc’s law: Later equals never.

> 我们都曾经瞟一眼自己亲手造成的混乱，决定弃之而不顾，走向新一天。我们都曾经看到自己的烂程序居然能运行，然后断言能运行的烂程序总比什么都没有强。我们都曾经说过有朝一日再回头清理。当然，在那些日子里，我们都没听过勒布朗（LeBlanc）法则：稍后等于永不（Later equals never）。

## 1.3 THE TOTAL COST OF OWNING A MESS 混乱的代价

If you have been a programmer for more than two or three years, you have probably been significantly slowed down by someone else’s messy code. If you have been a programmer for longer than two or three years, you have probably been slowed down by messy code. The degree of the slowdown can be significant. Over the span of a year or two, teams that were moving very fast at the beginning of a project can find themselves moving at a snail’s pace. Every change they make to the code breaks two or three other parts of the code. No change is trivial. Every addition or modification to the system requires that the tangles, twists, and knots be “understood” so that more tangles, twists, and knots can be added. Over time the mess becomes so big and so deep and so tall, they can not clean it up. There is no way at all.

> 只要你干过两三年编程，就有可能曾被某人的糟糕的代码绊倒过。如果你编程不止两三年，也有可能被这种代码拖过后腿。进度延缓的程度会很严重。有些团队在项目初期进展迅速，但有那么一两年的时间却慢如蜗行。对代码的每次修改都影响到其他两三处代码。修改无小事。每次添加或修改代码，都得对那堆扭纹柴了然于心，这样才能往上扔更多的扭纹柴。这团乱麻越来越大，再也无法理清，最后束手无策。

As the mess builds, the productivity of the team continues to decrease, asymptotically approaching zero. As productivity decreases, management does the only thing they can; they add more staff to the project in hopes of increasing productivity. But that new staff is not versed in the design of the system. They don’t know the difference between a change that matches the design intent and a change that thwarts the design intent. Furthermore, they, and everyone else on the team, are under horrific pressure to increase productivity. So they all make more and more messes, driving the productivity ever further toward zero. (See Figure 1-1.)

> 随着混乱的增加，团队生产力也持续下降，趋向于零。当生产力下降时，管理层就只有一件事可做了：增加更多人手到项目中，期望提升生产力。可是新人并不熟悉系统的设计。他们搞不清楚什么样的修改符合设计意图，什么样的修改违背设计意图。而且，他们以及团队中的其他人都背负着提升生产力的可怕压力。于是，他们制造更多的混乱，驱动生产力向零那端不断下降。如图 1-1 所示

Figure 1-1 Productivity vs. time

![](figures/ch1/1-4fig_martin.jpg)

### 1.3.1 The Grand Redesign in the Sky 华丽新设计

Eventually the team rebels. They inform management that they cannot continue to develop in this odious code base. They demand a redesign. Management does not want to expend the resources on a whole new redesign of the project, but they cannot deny that productivity is terrible. Eventually they bend to the demands of the developers and authorize the grand redesign in the sky.

> 最后，开发团队造反了，他们告诉管理层，再也无法在这令人生厌的代码基础上做开发。他们要求做全新的设计。管理层不愿意投入资源完全重启炉灶，但他们也不能否认生产力低得可怕。他们只好同意开发者的要求，授权去做一套看上去很美的华丽新设计。

A new tiger team is selected. Everyone wants to be on this team because it’s a green-field project. They get to start over and create something truly beautiful. But only the best and brightest are chosen for the tiger team. Everyone else must continue to maintain the current system.

> 于是就组建了一支新军。谁都想加入这个团队，因为它是张白纸。他们可以重新来过，搞出点真正漂亮的东西来。但只有最优秀、最聪明的家伙被选中。其余人等则继续维护现有系统。

Now the two teams are in a race. The tiger team must build a new system that does everything that the old system does. Not only that, they have to keep up with the changes that are continuously being made to the old system. Management will not replace the old system until the new system can do everything that the old system does.

> 现在有两支队伍在竞赛了。新团队必须搭建一套新系统，要能实现旧系统的所有功能。另外，还得跟上对旧系统的持续改动。在新系统功能足以抗衡旧系统之前，管理层不会替换掉旧系统。

This race can go on for a very long time. I’ve seen it take 10 years. And by the time it’s done, the original members of the tiger team are long gone, and the current members are demanding that the new system be redesigned because it’s such a mess.

> 竞赛可能会持续极长时间。我就见过延续了十年之久的。到了完成的时候，新团队的老成员早已不知去向，而现有成员则要求重新设计一套新系统，因为这套系统太烂了。

If you have experienced even one small part of the story I just told, then you already know that spending time keeping your code clean is not just cost effective; it’s a matter of professional survival.

> 假使你经历过哪怕是一小段我谈到的这种事，那么你一定知道，花时间保持代码整洁不但有关效率，还有关生存。

### 1.3.2 Attitude 态度

Have you ever waded through a mess so grave that it took weeks to do what should have taken hours? Have you seen what should have been a one-line change, made instead in hundreds of different modules? These symptoms are all too common.

> 你是否遇到过某种严重到要花数个星期来做本来只需数小时即可完成的事的混乱状况？你是否见过本来只需做一行修改，结果却涉及上百个模块的情况？这种事太常见了。

Why does this happen to code? Why does good code rot so quickly into bad code? We have lots of explanations for it. We complain that the requirements changed in ways that thwart the original design. We bemoan the schedules that were too tight to do things right. We blather about stupid managers and intolerant customers and useless marketing types and telephone sanitizers. But the fault, dear Dilbert, is not in our stars, but in ourselves. We are unprofessional.

> 怎么会发生这种事？为什么好代码会这么快就变质成糟糕的代码？理由多得很。我们抱怨需求变化背离了初期设计。我们哀叹进度太紧张，没法干好活。我们把问题归咎于那些愚蠢的经理、苛求的用户、没用的营销方式和那些电话消毒剂。不过，亲爱的呆伯特（Dilbert）[2]，我们是自作自受[3]。我们太不专业了。

This may be a bitter pill to swallow. How could this mess be our fault? What about the requirements? What about the schedule? What about the stupid managers and the useless marketing types? Don’t they bear some of the blame?

> 这话可不太中听。怎么会是自作自受呢？难道不关需求的事？难道不关进度的事？难道不关那些蠢经理和没用的营销手段的事？难道他们就不该负点责吗？

No. The managers and marketers look to us for the information they need to make promises and commitments; and even when they don’t look to us, we should not be shy about telling them what we think. The users look to us to validate the way the requirements will fit into the system. The project managers look to us to help work out the schedule. We are deeply complicit in the planning of the project and share a great deal of the responsibility for any failures; especially if those failures have to do with bad code!

> 不。经理和营销人员指望从我们这里得到必须的信息，然后才能做出承诺和保证；即便他们没开口问，我们也不该羞于告知自己的想法。用户指望我们验证需求是否都在系统中实现了。项目经理指望我们遵守进度。我们与项目的规划脱不了干系，对失败负有极大的责任；特别是当失败与糟糕的代码有关时尤为如此！

“But wait!” you say. “If I don’t do what my manager says, I’ll be fired.” Probably not. Most managers want the truth, even when they don’t act like it. Most managers want good code, even when they are obsessing about the schedule. They may defend the schedule and requirements with passion; but that’s their job. It’s your job to defend the code with equal passion.

> “且慢！”你说。“不听经理的，我就会被炒鱿鱼。”多半不会。多数经理想要知道实情，即便他们看起来不喜欢实情。多数经理想要好代码，即便他们总是痴缠于进度。他们会奋力卫护进度和需求；那是他们该干的。你则当以同等的热情卫护代码。

To drive this point home, what if you were a doctor and had a patient who demanded that you stop all the silly hand-washing in preparation for surgery because it was taking too much time?2 Clearly the patient is the boss; and yet the doctor should absolutely refuse to comply. Why? Because the doctor knows more than the patient about the risks of disease and infection. It would be unprofessional (never mind criminal) for the doctor to comply with the patient.

> 再说明白些，假使你是位医生，病人请求你在给他做手术前别洗手，因为那会花太多时间，你会照办吗[4]？本该是病人说了算；但医生却绝对应该拒绝遵从。为什么？因为医生比病人更了解疾病和感染的风险。医生如果按病人说的办，就是一种不专业的态度（更别说是犯罪了）。

2. When hand-washing was first recommended to physicians by Ignaz Semmelweis in 1847, it was rejected on the basis that doctors were too busy and wouldn’t have time to wash their hands between patient visits.

So too it is unprofessional for programmers to bend to the will of managers who don’t understand the risks of making messes.

> 同理，程序员遵从不了解混乱风险的经理的意愿，也是不专业的做法。

### 1.3.3 The Primal Conundrum 迷题

Programmers face a conundrum of basic values. All developers with more than a few years experience know that previous messes slow them down. And yet all developers feel the pressure to make messes in order to meet deadlines. In short, they don’t take the time to go fast!

> 程序员面临着一种基础价值谜题。有那么几年经验的开发者都知道，之前的混乱拖了自己的后腿。但开发者们背负期限的压力，只好制造混乱。简言之，他们没花时间让自己做得更快！

True professionals know that the second part of the conundrum is wrong. You will not make the deadline by making the mess. Indeed, the mess will slow you down instantly, and will force you to miss the deadline. The only way to make the deadline—the only way to go fast—is to keep the code as clean as possible at all times.

> 真正的专业人士明白，这道谜题的第二部分说错了。制造混乱无助于赶上期限。混乱只会立刻拖慢你，叫你错过期限。赶上期限的唯一方法——做得快的唯一方法 ——就是始终尽可能保持代码整洁。

### 1.3.4 The Art of Clean Code? 整洁代码的艺术

Let’s say you believe that messy code is a significant impediment. Let’s say that you accept that the only way to go fast is to keep your code clean. Then you must ask yourself: “How do I write clean code?” It’s no good trying to write clean code if you don’t know what it means for code to be clean!

> 假设你相信混乱的代码是祸首，假设你接受做得快的唯一方法是保持代码整洁的说法，你一定会自问：“我怎么才能写出整洁的代码？”不过，如果你不明白整洁对代码有何意义，尝试去写整洁代码就毫无所益！

The bad news is that writing clean code is a lot like painting a picture. Most of us know when a picture is painted well or badly. But being able to recognize good art from bad does not mean that we know how to paint. So too being able to recognize clean code from dirty code does not mean that we know how to write clean code!

> 坏消息是写整洁代码很像是绘画。多数人都知道一幅画是好还是坏。但能分辨优劣并不表示懂得绘画。能分辨整洁代码和肮脏代码，也不意味着会写整洁代码！

Writing clean code requires the disciplined use of a myriad little techniques applied through a painstakingly acquired sense of “cleanliness.” This “code-sense” is the key. Some of us are born with it. Some of us have to fight to acquire it. Not only does it let us see whether code is good or bad, but it also shows us the strategy for applying our discipline to transform bad code into clean code.

> 写整洁代码，需要遵循大量的小技巧，贯彻刻苦习得的“整洁感”。这种“代码感”就是关键所在。有些人生而有之。有些人费点劲才能得到。它不仅让我们看到代码的优劣，还予我们以借戒规之力化劣为优的攻略。

A programmer without “code-sense” can look at a messy module and recognize the mess but will have no idea what to do about it. A programmer with “code-sense” will look at a messy module and see options and variations. The “code-sense” will help that programmer choose the best variation and guide him or her to plot a sequence of behavior preserving transformations to get from here to there.

> 缺乏“代码感”的程序员，看混乱是混乱，无处着手。有“代码感”的程序员能从混乱中看出其他的可能与变化。“代码感”帮助程序员选出最好的方案，并指导程序员制订修改行动计划，按图索骥。

In short, a programmer who writes clean code is an artist who can take a blank screen through a series of transformations until it is an elegantly coded system.

> 简言之，编写整洁代码的程序员就像是艺术家，他能用一系列变换把一块白板变作由优雅代码构成的系统。

### 1.3.5 What Is Clean Code? 什么是整洁代码

There are probably as many definitions as there are programmers. So I asked some very well-known and deeply experienced programmers what they thought.

> 有多少程序员，就有多少定义。所以我只询问了一些非常知名且经验丰富的程序员。

![](figures/ch1/1-5fig_martin.jpg)

Bjarne Stroustrup, inventor of C++ and author of The C++ Programming Language

> Bjarne Stroustrup，C++语言发明者，C++Programming Language（中译版《C++程序设计语言》）一书作者。

I like my code to be elegant and efficient. The logic should be straightforward to make it hard for bugs to hide, the dependencies minimal to ease maintenance, error handling complete according to an articulated strategy, and performance close to optimal so as not to tempt people to make the code messy with unprincipled optimizations. Clean code does one thing well.

> 我喜欢优雅和高效的代码。代码逻辑应当直截了当，叫缺陷难以隐藏；尽量减少依赖关系，使之便于维护；依据某种分层战略完善错误处理代码；性能调至最优，省得引诱别人做没规矩的优化，搞出一堆混乱来。整洁的代码只做好一件事。

Bjarne uses the word “elegant.” That’s quite a word! The dictionary in my MacBook® provides the following definitions: pleasingly graceful and stylish in appearance or manner; pleasingly ingenious and simple. Notice the emphasis on the word “pleasing.” Apparently Bjarne thinks that clean code is pleasing to read. Reading it should make you smile the way a well-crafted music box or well-designed car would.

> Bjarne 用了“优雅”一词。说得好！我 MacBook 上的词典提供了如下定义：外表或举止上令人愉悦的优美和雅观；令人愉悦的精致和简单。注意对“愉悦”一词的强调。Bjarne 显然认为整洁的代码读起来令人愉悦。读这种代码，就像见到手工精美的音乐盒或者设计精良的汽车一般，让你会心一笑。

Bjarne also mentions efficiency—twice. Perhaps this should not surprise us coming from the inventor of C++; but I think there’s more to it than the sheer desire for speed. Wasted cycles are inelegant, they are not pleasing. And now note the word that Bjarne uses to describe the consequence of that inelegance. He uses the word “tempt.” There is a deep truth here. Bad code tempts the mess to grow! When others change bad code, they tend to make it worse.

> Bjarne 也提到效率——而且两次提及。这话出自 C++发明者之口，或许并不出奇；不过我认为并非是在单纯追求速度。被浪费掉的运算周期并不雅观，并不令人愉悦。留意 Bjarne 怎么描述那种不雅观的结果。他用了“引诱”这个词。诚哉斯言。糟糕的代码引发混乱！别人修改糟糕的代码时，往往会越改越烂。

Pragmatic Dave Thomas and Andy Hunt said this a different way. They used the metaphor of broken windows.3 A building with broken windows looks like nobody cares about it. So other people stop caring. They allow more windows to become broken. Eventually they actively break them. They despoil the facade with graffiti and allow garbage to collect. One broken window starts the process toward decay.

> 务实的 Dave Thomas 和 Andy Hunt 从另一角度阐述了这种情况。他们提到破窗理论[5]。窗户破损了的建筑让人觉得似乎无人照管。于是别人也再不关心。他们放任窗户继续破损。最终自己也参加破坏活动，在外墙上涂鸦，任垃圾堆积。一扇破损的窗户开辟了大厦走向倾颓的道路。

3. http://www.pragmaticprogrammer.com/booksellers/2004-12.html

Bjarne also mentions that error handing should be complete. This goes to the discipline of paying attention to details. Abbreviated error handling is just one way that programmers gloss over details. Memory leaks are another, race conditions still another. Inconsistent naming yet another. The upshot is that clean code exhibits close attention to detail.

> Bjarne 也提到完善错误处理代码。往深处说就是在细节上花心思。敷衍了事的错误处理代码只是程序员忽视细节的一种表现。此外还有内存泄漏，还有竞态条件代码。还有前后不一致的命名方式。结果就是凸现出整洁代码对细节的重视。

Bjarne closes with the assertion that clean code does one thing well. It is no accident that there are so many principles of software design that can be boiled down to this simple admonition. Writer after writer has tried to communicate this thought. Bad code tries to do too much, it has muddled intent and ambiguity of purpose. Clean code is focused. Each function, each class, each module exposes a single-minded attitude that remains entirely undistracted, and unpolluted, by the surrounding details.

> Bjarne 以“整洁的代码只做好一件事”结束论断。毋庸置疑，软件设计的许多原则最终都会归结为这句警语。有那么多人发表过类似的言论。糟糕的代码想做太多事，它意图混乱、目的含混。整洁的代码力求集中。每个函数、每个类和每个模块都全神贯注于一事，完全不受四周细节的干扰和污染。

Grady Booch, author of Object Oriented Analysis and Design with Applications

> Grady Booch，Object Oriented Analysis and Design with Applications（中译版《面向对象分析与设计》）一书作者。

![](figures/ch1/1-6fig_martin.jpg)

Clean code is simple and direct. Clean code reads like well-written prose. Clean code never obscures the designer’s intent but rather is full of crisp abstractions and straightforward lines of control.

> 整洁的代码简单直接。整洁的代码如同优美的散文。整洁的代码从不隐藏设计者的意图，充满了干净利落的抽象和直截了当的控制语句。

Grady makes some of the same points as Bjarne, but he takes a readability perspective. I especially like his view that clean code should read like well-written prose. Think back on a really good book that you’ve read. Remember how the words disappeared to be replaced by images! It was like watching a movie, wasn’t it? Better! You saw the characters, you heard the sounds, you experienced the pathos and the humor.

> Grady 的观点与 Bjarne 的观点有类似之处，但他从可读性的角度来定义。我特别喜欢“整洁的代码如同优美的散文”这种看法。想想你读过的某本好书。回忆一下，那些文字是如何在脑中形成影像！就像是看了场电影，对吧？还不止！你还看到那些人物，听到那些声音，体验到那些喜怒哀乐。

Reading clean code will never be quite like reading Lord of the Rings. Still, the literary metaphor is not a bad one. Like a good novel, clean code should clearly expose the tensions in the problem to be solved. It should build those tensions to a climax and then give the reader that “Aha! Of course!” as the issues and tensions are resolved in the revelation of an obvious solution.

> 阅读整洁的代码和阅读 Lord of the Rings（中译版《指环王》）自然不同。不过，仍有可类比之处。如同一本好的小说般，整洁的代码应当明确地展现出要解决问题的张力。它应当将这种张力推至高潮，以某种显而易见的方案解决问题和张力，使读者发出“啊哈！本当如此！”的感叹。

I find Grady’s use of the phrase “crisp abstraction” to be a fascinating oxymoron! After all the word “crisp” is nearly a synonym for “concrete.” My MacBook’s dictionary holds the following definition of “crisp”: briskly decisive and matter-of-fact, without hesitation or unnecessary detail. Despite this seeming juxtaposition of meaning, the words carry a powerful message. Our code should be matter-of-fact as opposed to speculative. It should contain only what is necessary. Our readers should perceive us to have been decisive.

> 窃以为 Grady 所谓“干净利落的抽象”（crisp abstraction），乃是绝妙的矛盾修辞法。毕竟 crisp 几乎就是“具体”（concrete）的同义词。我 MacBook 上的词典这样定义 crisp 一词：果断决绝，就事论事，没有犹豫或不必要的细节。尽管有两种不同的定义，该词还是承载了有力的信息。代码应当讲述事实，不引人猜测。它只该包含必需之物。读者应当感受到我们的果断决绝。

“Big” Dave Thomas, founder of OTI, godfather of the Eclipse strategy

> “老大”Dave Thomas，OTI 公司创始人，Eclipse 战略教父。

![](figures/ch1/1-7fig_martin.jpg)

Clean code can be read, and enhanced by a developer other than its original author. It has unit and acceptance tests. It has meaningful names. It provides one way rather than many ways for doing one thing. It has minimal dependencies, which are explicitly defined, and provides a clear and minimal API. Code should be literate since depending on the language, not all necessary information can be expressed clearly in code alone.

> 整洁的代码应可由作者之外的开发者阅读和增补。它应当有单元测试和验收测试。它使用有意义的命名。它只提供一种而非多种做一件事的途径。它只有尽量少的依赖关系，而且要明确地定义和提供清晰、尽量少的 API。代码应通过其字面表达含义，因为不同的语言导致并非所有必需信息均可通过代码自身清晰表达。

Big Dave shares Grady’s desire for readability, but with an important twist. Dave asserts that clean code makes it easy for other people to enhance it. This may seem obvious, but it cannot be overemphasized. There is, after all, a difference between code that is easy to read and code that is easy to change.

> Dave 老大在可读性上和 Grady 持相同观点，但有一个重要的不同之处。Dave 断言，整洁的代码便于其他人加以增补。这看似显而易见，但亦不可过分强调。毕竟易读的代码和易修改的代码之间还是有区别的。

Dave ties cleanliness to tests! Ten years ago this would have raised a lot of eyebrows. But the discipline of Test Driven Development has made a profound impact upon our industry and has become one of our most fundamental disciplines. Dave is right. Code, without tests, is not clean. No matter how elegant it is, no matter how readable and accessible, if it hath not tests, it be unclean.

> Dave 将整洁系于测试之上！要在十年之前，这会让人大跌眼镜。但测试驱动开发（Test Driven Development）已在行业中造成了深远影响，成为基础规程之一。Dave 说得对。没有测试的代码不干净。不管它有多优雅，不管有多可读、多易理解，微乎测试，其不洁亦可知也。

Dave uses the word minimal twice. Apparently he values code that is small, rather than code that is large. Indeed, this has been a common refrain throughout software literature since its inception. Smaller is better.

> Dave 两次提及“尽量少”。显然，他推崇小块的代码。实际上，从有软件起人们就在反复强调这一点。越小越好。

Dave also says that code should be literate. This is a soft reference to Knuth’s literate programming.4 The upshot is that the code should be composed in such a form as to make it readable by humans.

> Dave 也提到，代码应在字面上表达其含义。这一观点源自 Knuth 的“字面编程”（literate programming）[6]。结论就是应当用人类可读的方式来写代码。

4. [Knuth92].

Michael Feathers, author of Working Effectively with Legacy Code

> Michael Feathers，Working Effectively with Legacy Code（中译版《修改代码的艺术》）一书作者。

![](figures/ch1/1-8fig_martin.jpg)

I could list all of the qualities that I notice in clean code, but there is one overarching quality that leads to all of them. Clean code always looks like it was written by someone who cares. There is nothing obvious that you can do to make it better. All of those things were thought about by the code’s author, and if you try to imagine improvements, you’re led back to where you are, sitting in appreciation of the code someone left for you—code left by someone who cares deeply about the craft.

> 我可以列出我留意到的整洁代码的所有特点，但其中有一条是根本性的。整洁的代码总是看起来像是某位特别在意它的人写的。几乎没有改进的余地。代码作者什么都想到了，如果你企图改进它，总会回到原点，赞叹某人留给你的代码——全心投入的某人留下的代码。

One word: care. That’s really the topic of this book. Perhaps an appropriate subtitle would be How to Care for Code.

> 一言以蔽之：在意。这就是本书的题旨所在。或许该加个副标题，如何在意代码。

Michael hit it on the head. Clean code is code that has been taken care of. Someone has taken the time to keep it simple and orderly. They have paid appropriate attention to details. They have cared.

> Michael 一针见血。整洁代码就是作者着力照料的代码。有人曾花时间让它保持简单有序。他们适当地关注到了细节。他们在意过。

Ron Jeffries, author of Extreme Programming Installed and Extreme Programming Adventures in C#

> Ron Jeffries，Extreme Programming Installed（中译版《极限编程实施》）以及 Extreme Programming Adventures in C#（中译版《C#极限编程探险》）作者。

Ron began his career programming in Fortran at the Strategic Air Command and has written code in almost every language and on almost every machine. It pays to consider his words carefully.

> Ron 初入行就在战略空军司令部（Strategic Air Command）编写 Fortran 程序，此后几乎在每种机器上编写过每种语言的代码。他的言论值得咀嚼。

![](figures/ch1/1-9fig_martin.jpg)

In recent years I begin, and nearly end, with Beck’s rules of simple code. In priority order, simple code:

> 近年来，我开始研究贝克的简单代码规则，差不多也都琢磨透了。简单代码，依其重要顺序：

- Runs all the tests;
- Contains no duplication;
- Expresses all the design ideas that are in the system;
- Minimizes the number of entities such as classes, methods, functions, and the like.

---

> - 能通过所有测试；
> - 没有重复代码；
> - 体现系统中的全部设计理念；
> - 包括尽量少的实体，比如类、方法、函数等。

Of these, I focus mostly on duplication. When the same thing is done over and over, it’s a sign that there is an idea in our mind that is not well represented in the code. I try to figure out what it is. Then I try to express that idea more clearly.

> 在以上诸项中，我最在意代码重复。如果同一段代码反复出现，就表示某种想法未在代码中得到良好的体现。我尽力去找出到底那是什么，然后再尽力更清晰地表达出来。

Expressiveness to me includes meaningful names, and I am likely to change the names of things several times before I settle in. With modern coding tools such as Eclipse, renaming is quite inexpensive, so it doesn’t trouble me to change. Expressiveness goes beyond names, however. I also look at whether an object or method is doing more than one thing. If it’s an object, it probably needs to be broken into two or more objects. If it’s a method, I will always use the Extract Method refactoring on it, resulting in one method that says more clearly what it does, and some submethods saying how it is done.

> 在我看来，有意义的命名是体现表达力的一种方式，我往往会修改好几次才会定下名字来。借助 Eclipse 这样的现代编码工具，重命名代价极低，所以我无所顾忌。然而，表达力还不只体现在命名上。我也会检查对象或方法是否想做的事太多。如果对象功能太多，最好是切分为两个或多个对象。如果方法功能太多，我总是使用抽取手段（Extract Method）重构之，从而得到一个能较为清晰地说明自身功能的方法，以及另外数个说明如何实现这些功能的方法。

Duplication and expressiveness take me a very long way into what I consider clean code, and improving dirty code with just these two things in mind can make a huge difference. There is, however, one other thing that I’m aware of doing, which is a bit harder to explain.

> 消除重复和提高表达力让我在整洁代码方面获益良多，只要铭记这两点，改进脏代码时就会大有不同。不过，我时常关注的另一规则就不太好解释了。

After years of doing this work, it seems to me that all programs are made up of very similar elements. One example is “find things in a collection.” Whether we have a database of employee records, or a hash map of keys and values, or an array of items of some kind, we often find ourselves wanting a particular item from that collection. When I find that happening, I will often wrap the particular implementation in a more abstract method or class. That gives me a couple of interesting advantages.

> 这么多年下来，我发现所有程序都由极为相似的元素构成。例如“在集合中查找某物”。不管是雇员记录数据库还是名-值对哈希表，或者某类条目的数组，我们都会发现自己想要从集合中找到某一特定条目。一旦出现这种情况，我通常会把实现手段封装到更抽象的方法或类中。这样做好处多多。

I can implement the functionality now with something simple, say a hash map, but since now all the references to that search are covered by my little abstraction, I can change the implementation any time I want. I can go forward quickly while preserving my ability to change later.

> 可以先用某种简单的手段，比如哈希表来实现这一功能，由于对搜索功能的引用指向了我那个小小的抽象，就能随需应变，修改实现手段。这样就既能快速前进，又能为未来的修改预留余地。

In addition, the collection abstraction often calls my attention to what’s “really” going on, and keeps me from running down the path of implementing arbitrary collection behavior when all I really need is a few fairly simple ways of finding what I want.

> 另外，该集合抽象常常提醒我留意“真正”在发生的事，避免随意实现集合行为，因为我真正需要的不过是某种简单的查找手段。

Reduced duplication, high expressiveness, and early building of simple abstractions. That’s what makes clean code for me.

> 减少重复代码，提高表达力，提早构建简单抽象。这就是我写整洁代码的方法。

Here, in a few short paragraphs, Ron has summarized the contents of this book. No duplication, one thing, expressiveness, tiny abstractions. Everything is there.

> Ron 以寥寥数段文字概括了本书的全部内容。不要重复代码，只做一件事，表达力，小规模抽象。该有的都有了。

Ward Cunningham, inventor of Wiki, inventor of Fit, coinventor of eXtreme Programming. Motive force behind Design Patterns. Smalltalk and OO thought leader. The godfather of all those who care about code.

> Ward Cunningham，Wiki 发明者，eXtreme Programming （极限编程）的创始人之一，Smalltalk 语言和面向对象的思想领袖。所有在意代码者的教父。

![](figures/ch1/1-10fig_martin.jpg)

You know you are working on clean code when each routine you read turns out to be pretty much what you expected. You can call it beautiful code when the code also makes it look like the language was made for the problem.

> 如果每个例程都让你感到深合己意，那就是整洁代码。如果代码让编程语言看起来像是专为解决那个问题而存在，就可以称之为漂亮的代码。

Statements like this are characteristic of Ward. You read it, nod your head, and then go on to the next topic. It sounds so reasonable, so obvious, that it barely registers as something profound. You might think it was pretty much what you expected. But let’s take a closer look.

> 这种说法很 Ward。它教你听了之后就点头，然后继续听下去。如此在理，如此浅显，绝不故作高深。你大概以为此言深合己意吧。再走近点看看。

“… pretty much what you expected.” When was the last time you saw a module that was pretty much what you expected? Isn’t it more likely that the modules you look at will be puzzling, complicated, tangled? Isn’t misdirection the rule? Aren’t you used to flailing about trying to grab and hold the threads of reasoning that spew forth from the whole system and weave their way through the module you are reading? When was the last time you read through some code and nodded your head the way you might have nodded your head at Ward’s statement?

> “……深合己意”。你最近一次看到深合己意的模块是什么时候？模块多半都繁复难解吧？难道没有触犯规则吗？你不是也曾挣扎着想抓住些从整个系统中散落而出的线索，编织进你在读的那个模块吗？你最近一次读到某段代码、并且如同对 Ward 的说法点头一般对这段代码点头，是什么时候的事了？

Ward expects that when you read clean code you won’t be surprised at all. Indeed, you won’t even expend much effort. You will read it, and it will be pretty much what you expected. It will be obvious, simple, and compelling. Each module will set the stage for the next. Each tells you how the next will be written. Programs that are that clean are so profoundly well written that you don’t even notice it. The designer makes it look ridiculously simple like all exceptional designs.

> Ward 期望你不会为整洁代码所震惊。你无需花太多力气。那代码就是深合你意。它明确、简单、有力。每个模块都为下一个模块做好准备。每个模块都告诉你下一个模块会是怎样的。整洁的程序好到你根本不会注意到它。设计者把它做得像一切其他设计般简单。

And what about Ward’s notion of beauty? We’ve all railed against the fact that our languages weren’t designed for our problems. But Ward’s statement puts the onus back on us. He says that beautiful code makes the language look like it was made for the problem! So it’s our responsibility to make the language look simple! Language bigots everywhere, beware! It is not the language that makes programs appear simple. It is the programmer that make the language appear simple!

> 那 Ward 有关“美”的说法又如何呢？我们都曾面临语言不是为要解决的问题所设计的困境。但 Ward 的说法又把球踢回我们这边。他说，漂亮的代码让编程语言像是专为解决那个问题而存在！所以，让语言变得简单的责任就在我们身上了！当心，语言是冥顽不化的！是程序员让语言显得简单。

## 1.4 SCHOOLS OF THOUGHT 思想流派

What about me (Uncle Bob)? What do I think clean code is? This book will tell you, in hideous detail, what I and my compatriots think about clean code. We will tell you what we think makes a clean variable name, a clean function, a clean class, etc. We will present these opinions as absolutes, and we will not apologize for our stridence. To us, at this point in our careers, they are absolutes. They are our school of thought about clean code.

> 我（鲍勃大叔）又是怎么想的呢？在我眼中整洁代码是什么样的？本书将以详细到吓死人的程度告诉你，我和我的同道对整洁代码的看法。我们会告诉你关于整洁变量名的想法，关于整洁函数的想法，关于整洁类的想法，如此等等。我们视这些观点为当然，且不为其逆耳而致歉。对我们而言，在职业生涯的这个阶段，这些观点确属当然，也是我们整洁代码派的圭旨。

![](figures/ch1/1-11fig_martin.jpg)

Martial artists do not all agree about the best martial art, or the best technique within a martial art. Often master martial artists will form their own schools of thought and gather students to learn from them. So we see Gracie Jiu Jistu, founded and taught by the Gracie family in Brazil. We see Hakkoryu Jiu Jistu, founded and taught by Okuyama Ryuho in Tokyo. We see Jeet Kune Do, founded and taught by Bruce Lee in the United States.

> 武术家从不认同所谓最好的武术，也不认同所谓绝招。武术大师们常常创建自己的流派，聚徒而授。因此我们才看到格雷西家族在巴西开创并传授的格雷西柔术（Gracie Jiu Jistu），看到奥山龙峰（Okuyama Ryuho）在东京开创并传授的八光流柔术（Hakkoryu Jiu Jistu），看到李小龙（Bruce Lee）在美国开创并传授的截拳道（Jeet Kune Do）。

Students of these approaches immerse themselves in the teachings of the founder. They dedicate themselves to learn what that particular master teaches, often to the exclusion of any other master’s teaching. Later, as the students grow in their art, they may become the student of a different master so they can broaden their knowledge and practice. Some eventually go on to refine their skills, discovering new techniques and founding their own schools.

> 弟子们沉浸于创始人的授业。他们全心师从某位师傅，排斥其他师傅。弟子有所成就后，可以转投另一位师傅，扩展自己的知识与技能。有些弟子最终百炼成钢，创出新招数，开宗立派。

None of these different schools is absolutely right. Yet within a particular school we act as though the teachings and techniques are right. After all, there is a right way to practice Hakkoryu Jiu Jitsu, or Jeet Kune Do. But this rightness within a school does not invalidate the teachings of a different school.

> 任何门派都并非绝对正确。不过，身处某一门派时，我们总以其所传之技为善。归根结底，练习八光流柔术或截拳道，自有其善法，但这并不能否定其他门派所授之法。

Consider this book a description of the Object Mentor School of Clean Code. The techniques and teachings within are the way that we practice our art. We are willing to claim that if you follow these teachings, you will enjoy the benefits that we have enjoyed, and you will learn to write code that is clean and professional. But don’t make the mistake of thinking that we are somehow “right” in any absolute sense. There are other schools and other masters that have just as much claim to professionalism as we. It would behoove you to learn from them as well.

> 可以把本书看作是对象导师（Object Mentor）[7]整洁代码派的说明。里面要传授的就是我们勤操己艺的方法。如果你遵从这些教诲，你就会如我们一般乐受其益，你将学会如何编写整洁而专业的代码。但无论如何也别错以为我们是“正确的”。其他门派和师傅和我们一样专业。你有必要也向他们学习。

Indeed, many of the recommendations in this book are controversial. You will probably not agree with all of them. You might violently disagree with some of them. That’s fine. We can’t claim final authority. On the other hand, the recommendations in this book are things that we have thought long and hard about. We have learned them through decades of experience and repeated trial and error. So whether you agree or disagree, it would be a shame if you did not see, and respect, our point of view.

> 实际上，书中很多建议都存在争议。或许你并不完全同意这些建议。你可能会强烈反对其中一些建议。这样挺好的。我们不能要求做最终权威。另外一方面，书中列出的建议，乃是我们长久苦思、从数十年的从业经验和无数尝试与错误中得来。无论你同意与否，如果你没看到或是不尊敬我们的观点，就真该自己害臊。

## 1.5 WE ARE AUTHORS 我们是作者

The @author field of a Javadoc tells us who we are. We are authors. And one thing about authors is that they have readers. Indeed, authors are responsible for communicating well with their readers. The next time you write a line of code, remember you are an author, writing for readers who will judge your effort.

> Javadoc 中的@author 字段告诉我们自己是什么人。我们是作者。作者都有读者。实际上，作者有责任与读者做良好沟通。下次你写代码的时候，记得自己是作者，要为评判你工作的读者写代码。

You might ask: How much is code really read? Doesn’t most of the effort go into writing it?

> 你或许会问：代码真正“读”的成分有多少呢？难道力量主要不是用在“写”上吗？

Have you ever played back an edit session? In the 80s and 90s we had editors like Emacs that kept track of every keystroke. You could work for an hour and then play back your whole edit session like a high-speed movie. When I did this, the results were fascinating.

> 你是否玩过“编辑器回放”？20 世纪 80、90 年代，Emac 之类编辑器记录每次击键动作。你可以在一小时工作之后，回放击键过程，就像是看一部高速电影。我这么做过，结果很有趣。

- The vast majority of the playback was scrolling and navigating to other modules!
- Bob enters the module.
- He scrolls down to the function needing change.
- He pauses, considering his options.
- Oh, he’s scrolling up to the top of the module to check the initialization of a variable.
- Now he scrolls back down and begins to type.
- Ooops, he’s erasing what he typed!
- He types it again.
- He erases it again!
- He types half of something else but then erases that!
- He scrolls down to another function that calls the function he’s changing to see how it is called.
- He scrolls back up and types the same code he just erased.
- He pauses.
- He erases that code again!
- He pops up another window and looks at a subclass. Is that function overridden?
- …

---

> - 回放过程显示，多数时间都是在滚动屏幕、浏览其他模块！
> - 鲍勃进入模块。
> - 他向下滚动到要修改的函数。
> - 他停下来考虑可以做什么。
> - 哦，他滚动到模块顶端，检查变量初始化。
> - 现在他回到修改处，开始键入。
> - 喔，他删掉了键入的内容。
> - 他重新键入。
> - 他又删除了！
> - 他键入了一半什么东西，又删除掉。
> - 他滚动到调用要修改函数的另一函数，看看是怎么调用的。
> - 他回到修改处，重新键入刚才删掉的代码。
> - 他停下来。
> - 他再一次删掉代码！
> - 他打开另一个窗口，查看别的子类。那是个复载函数吗？
> - ……

You get the drift. Indeed, the ratio of time spent reading vs. writing is well over 10:1. We are constantly reading old code as part of the effort to write new code.

> 你该明白了。读与写花费时间的比例超过 10:1。写新代码时，我们一直在读旧代码。

Because this ratio is so high, we want the reading of code to be easy, even if it makes the writing harder. Of course there’s no way to write code without reading it, so making it easy to read actually makes it easier to write.

> 既然比例如此之高，我们就想让读的过程变得轻松，即便那会使得编写过程更难。没可能光写不读，所以使之易读实际也使之易写。

There is no escape from this logic. You cannot write code if you cannot read the surrounding code. The code you are trying to write today will be hard or easy to write depending on how hard or easy the surrounding code is to read. So if you want to go fast, if you want to get done quickly, if you want your code to be easy to write, make it easy to read.

> 这事概无例外。不读周边代码的话就没法写代码。编写代码的难度，取决于读周边代码的难度。要想干得快，要想早点做完，要想轻松写代码，先让代码易读吧。

## 1.6 THE BOY SCOUT RULE 童子军军规

It’s not enough to write the code well. The code has to be kept clean over time. We’ve all seen code rot and degrade as time passes. So we must take an active role in preventing this degradation.

> 光把代码写好可不够。必须时时保持代码整洁。我们都见过代码随时间流逝而腐坏。我们应当更积极地阻止腐坏的发生。

The Boy Scouts of America have a simple rule that we can apply to our profession.

> 借用美国童子军一条简单的军规，应用到我们的专业领域：

Leave the campground cleaner than you found it.5

> 让营地比你来时更干净。

5. This was adapted from Robert Stephenson Smyth Baden-Powell’s farewell message to the Scouts: “Try and leave this world a little better than you found it…”

If we all checked-in our code a little cleaner than when we checked it out, the code simply could not rot. The cleanup doesn’t have to be something big. Change one variable name for the better, break up one function that’s a little too large, eliminate one small bit of duplication, clean up one composite if statement.

> 如果每次签入时，代码都比签出时干净，那么代码就不会腐坏。清理并不一定要花多少功夫，也许只是改好一个变量名，拆分一个有点过长的函数，消除一点点重复代码，清理一个嵌套 if 语句。

Can you imagine working on a project where the code simply got better as time passed? Do you believe that any other option is professional? Indeed, isn’t continuous improvement an intrinsic part of professionalism?

> 你想要为一个代码随时间流逝而越变越好的项目工作吗？你还能相信有其他更专业的做法吗？难道持续改进不是专业性的内在组成部分吗？

## 1.7 PREQUEL AND PRINCIPLES 前传与原则

In many ways this book is a “prequel” to a book I wrote in 2002 entitled Agile Software Development: Principles, Patterns, and Practices (PPP). The PPP book concerns itself with the principles of object-oriented design, and many of the practices used by professional developers. If you have not read PPP, then you may find that it continues the story told by this book. If you have already read it, then you’ll find many of the sentiments of that book echoed in this one at the level of code.

> 从许多角度看，本书都是我 2002 年写那本 Agile SoftwareDevelopment：Principles，Patterns，and Practices（中译版《敏捷软件开发：原则、模式与实践》，简称 PPP）的“前传”。PPP 关注面向对象设计的原则，以及专业开发者采用的许多实践方法。假如你没读过 PPP，你会发现它像这本书的延续。如果你读过，会发现那本书的主张在代码层面于本书中回响。

In this book you will find sporadic references to various principles of design. These include the Single Responsibility Principle (SRP), the Open Closed Principle (OCP), and the Dependency Inversion Principle (DIP) among others. These principles are described in depth in PPP.

> 在本书中，你会发现对不同设计原则的引用，包括单一权责原则（Single Responsibility Principle，SRP）、开放闭合原则（Open Closed Principle，OCP）和依赖倒置原则（Dependency Inversion Principle，DIP）等。

## 1.8 CONCLUSION 小结

Books on art don’t promise to make you an artist. All they can do is give you some of the tools, techniques, and thought processes that other artists have used. So too this book cannot promise to make you a good programmer. It cannot promise to give you “code-sense.” All it can do is show you the thought processes of good programmers and the tricks, techniques, and tools that they use.

> 艺术书并不保证你读过之后能成为艺术家，只能告诉你其他艺术家用过的工具、技术和思维过程。本书同样也不担保让你成为好程序员。它不担保能给你“代码感”。它所能做的，只是展示好程序员的思维过程，还有他们使用的技巧、技术和工具。

Just like a book on art, this book will be full of details. There will be lots of code. You’ll see good code and you’ll see bad code. You’ll see bad code transformed into good code. You’ll see lists of heuristics, disciplines, and techniques. You’ll see example after example. After that, it’s up to you.

> 和艺术书一样，本书也充满了细节。代码会很多。你会看到好代码，也会看到糟糕的代码。你会看到糟糕的代码如何转化为好代码。你会看到启发、规条和技巧的列表。你会看到一个又一个例子。但最终结果取决于你自己。

Remember the old joke about the concert violinist who got lost on his way to a performance? He stopped an old man on the corner and asked him how to get to Carnegie Hall. The old man looked at the violinist and the violin tucked under his arm, and said: “Practice, son. Practice!”

> 还记得那个关于小提琴家在去表演的路上迷路的老笑话吗？他在街角拦住一位长者，问他怎么才能去卡耐基音乐厅（Carnegie Hall）。长者看了看小提琴家，又看了看他手中的琴，说道：“你还得练，孩子，还得练！”
