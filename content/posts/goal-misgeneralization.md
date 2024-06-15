+++
draft = false
date = 2024-06-13T20:40:58+01:00
title = "Language for Goal Misgeneralization"
description = "Some formalisms from my MSc Thesis, connecting goal misgeneralization to causal confusion and multi-task learning, and proposing a new definition."
slug = "goal-misgenerlization"
tags = ["AI Safety", "Language Models"]
math=true
+++

> Also posted on LessWrong
> [here](https://www.lesswrong.com/posts/7XPqssBkfy2gnihCi/goal-misgeneralization-some-formalisms-from-my-msc-thesis).

The following is an edited excerpt from the _Preliminaries_ and _Background_
sections of my now completed MSc thesis in Artificial Intelligence from the
University of Amsterdam.

In the thesis, we set out to tackle the issue of _Goal Misgeneralization_ (GMG)
in Sequential Decision Making (SDM)[^1] by focusing on improving _task
specification_. Below, we first link GMG to causal confusion, motivating our
approach. We then outline specifically what we mean by task specification, and
later discuss the implications for our own definition of GMG.

I am sharing this here because I believe the ideas presented here are at least
somewhat interesting and have not seen them discussed elsewhere. We ultimately
did not publish the thesis, so rather than keeping these to myself, I figured
I'd at least share them here.

You can find the full thesis along with its code
[here](https://github.com/thesofakillers/nlgoals).

## Causal Confusion and Goal Misgeneralization

Inspired by the works of [Gupta et al. (2022)](#ref-gupta_can_2022) and
[Kirk and Krueger (2022)](#ref-kirk_causal_2022), we hold the view that GMG is a
direct consequence of *causal confusion
(CC)* ([de Haan, Jayaraman, and Levine 2019](#ref-de_haan_causal_2019)). This is
the phenomenon by which a learner incorrectly identifies the causal model
underlying its observations and/or behaviour. This is typically due to spurious
correlations between the true cause $X$ for a random event $Y$ and some other
variable $W$ that does not causally model $Y$. We posit that CC may lead to GMG
when the confounding variable, i.e. the variable spuriously correlated with the
causal factor, is easier to learn.

Accordingly, we note that GMG may therefore be addressed by tackling CC itself.
In light of this, we can distinguish three approaches. The first involves
performing causal inference with the assistance of interventions on the data so
to better discover the underlying causal model. This is the main approach of
[de Haan, Jayaraman, and Levine (2019)](#ref-de_haan_causal_2019). The second
approach simply increases the variability of the training data so as to reduce
the likelihood of spurious correlations. This is the main approach of
[Langosco et al. (2022)](#ref-langosco_goal_2022). The final approach focuses on
improving the expressiveness of the task specification. We hypothesize that
overly coarse specifications may lead to ambiguity in which task is being
requested, increasing the chance of causal confusion. We provide more detail in
the next sections.

While each of these approaches have merit, we decide to focus on the third. Our
motivation is manifold. First, we expect implementations under the first
approach to become increasingly more difficult as the field shifts towards
offline-learning ([Lange, Gabel, and Riedmiller 2012](#ref-lange_batch_2012);
[Levine et al. 2020](#ref-levine_offline_2020);
[Prudencio, Maximo, and Colombini 2022](#ref-prudencio_survey_2022)). Secondly,
while the simplicity of the second approach coupled with recent advancements in
scaling laws ([Kaplan et al. 2020](#ref-kaplan_scaling_2020);
[Hoffmann et al. 2022](#ref-hoffmann_training_2022)) is promising, we note that
increasing the variability of the training data has no guarantee of
de-correlating confounding variables, especially when the spurious correlations
are unknown, rendering estimating how much and what kind of variability to work
on potentially difficult for more insidious cases of
GMG ([Kirk and Krueger 2022](#ref-kirk_causal_2022)). We choose to focus on the
approach of improving task specification not only because we view it as an
under-explored option, but more importantly because, as we will outline below,
we view GMG as intrinsically tied to multi-task
learning ([Caruana 1997](#ref-caruana_multitask_1997)), which itself is
intrinsically tied to task specification.

## Task specification

_Task specification_ is the scenario in which a _requester_ $\mathcal{R}$
specifies a _task_ $\mathcal{T}$ to be performed by an _actor_
$\mathcal{A}$[^2]. In SDM, The requester expresses a high-level representation
$\mathcal{Z}$ of the ideal trajectory of state-action pairs, corresponding to
the task they would like to be performed. We specifically allow high-level
representations of trajectories because it can occur that the requester does not
know exactly what sequence of state-action pairs they want, and are typically
more interested in more abstract, higher level desiderata anyway.

The actor is necessarily a multi-task policy, as otherwise task-specification
would be futile. The actor receives $\mathcal{Z}$ and "interprets" it by using
it as a conditional variable on its policy. Like
[M. Cho, Jung, and Sung (2022)](#ref-cho_multi-task_2022), we therefore write
the actor's policy as $\pi(a \mid s,
    \mathcal{Z})$, where $\mathcal{Z}$
represents an encoding of the intended task. We underline that $\mathcal{Z}$ can
in principle take any form and originate from any source. Examples include
rewards, one-hot encodings, demonstrations,
preferences ([Christiano et al. 2017](#ref-christiano_deep_2017)), formal
language ([Bansal 2022](#ref-bansal_specification-guided_2022)), natural
language, _et cetera_.

## Specification and causal confusion {#meth:sec:spec_causal}

Suppose we have some latent _notion_ $N$, an abstraction encapsulating some
semantic information, that we wish to communicate. The notion is latent, i.e.
not observed directly, and we can instead communicate it through some language
$L$ which maps the notion $N$ to some corresponding expression $N_L$. Note that
there can be more than one corresponding expression per notion. In general, the
mapping between notion and language expression is many-to-many. Under our task
specification framework from above, the task we wish to specify $\mathcal{T}$ is
the notion we wish to communicate $N$, and the high-level representation
$\mathcal{Z}$ is the expression $N_L$ we use to communicate it.

In the context of communication, a notion $N$ and its corresponding expressions
$N_L^1, N_L^2, \dots$, can be treated as random variables. This assumption can
be made given the wide, almost infinite range of possible notions one may wish
to communicate, and similarly to the wide range of ways in which a notion can be
expressed. These lead to uncertainty which we can treat probabilistically with
random variables.

We can therefore quantify the information content of a given notion or
expression using the concept of
entropy ([Shannon 1948](#ref-shannon_mathematical_1948)). Entropy effectively
quantifies the average level of uncertainty or "surprise" associated with a
random variable. For a discrete random variable $X$, its entropy $H(X)$ is
defined as

$$
H(X) = -\sum_{x \in X} p(x) \log p(x)
$$

where $p(x)$ is the probability mass function of $X$, and the summation is over
all possible outcomes $x$ of $X$. A higher entropy indicates greater uncertainty
and thus greater information content. If an outcome is highly uncertain, it
means we have very little prior knowledge about what that outcome will be.
Therefore, learning the actual outcome provides us with a substantial amount of
new information. Conversely, if an event is certain to occur, then learning that
this event has indeed occurred doesn't provide us with any new information
because we already knew it would happen. Thus, a higher entropy indicates
greater uncertainty and thus greater information content.

The entropy of a given notion $N$ and an expression of it $N_L$ therefore serves
as the measure of their respective information content. For a notion, we can
write

$$
H(N) = -\sum_{n \in N} p(n) \log p(n),
$$

where $p(n)$ is the probability of notion $n$ being the one intended for
communication. For an expression, we can write

$$
H(N_L) = -\sum_{n_l \in N_L} p(n_l) \log p(n_l),
$$

where $p(n_l)$ is the probability of expression $n_l$ being the one used for
communication.

$N_L$ will typically be a _compressed_ representation of $N$. In other words,
the mapping between notion and expression is not necessarily _lossless_ in terms
of information

$$
\text{H}(N_L) \leq \text{H}(N).
$$

This compression can be either _intrinsic_ or _extrinsic_. The former case
corresponds to compression that occurs due to the fundamentally limited
expressivity of the language $L$. For example, a language that lacks the grammar
and/or vocabulary for expressing negation, will be fundamentally limited from
expressing the notion of absence.

Extrinsic compression is compression that occurs due to reasons external to the
language itself. This is typically the communicator choosing to use a coarser
expression of the notion. For example, choosing to communicate "go to the block"
rather than "breathe in, activate your muscles such that your right thigh lifts
your right foot off the ground and forward, breathe out, breathe in, \...".

Compression, whether intrinsic, extrinsic or either, can lead to _ambiguity_.
These are cases where the same expression $F$, due to underspecification, maps
to multiple semantically different notions $N_1, N_2, \dots$. We view this as a
potential avenue for causal confusion to occur.

For instance, under our definitions, we can frame rewards as a language used to
communicate some notion of a desired task to SDM agents. When our rewards are
underspecified, they can over-compress our task notion, such that the same
reward maps to multiple tasks. The policy may therefore suffer from causal
confusion and learn to pursue the wrong task.

We therefore posit that causal confusion and hence GMG can be addressed by
focusing on how we specify the task, so to reduce ambiguity in the task
specification. We move away from
rewards ([Vamplew et al. 2022](#ref-vamplew_scalar_2022)) and instead leverage
the potentially much higher expressiveness of natural language, spurred by
recent advancements in the field of natural language processing
(NLP) ([Devlin et al. 2019](#ref-devlin_bert_2019);
[Brown et al. 2020](#ref-brown_language_2020);
[Touvron et al. 2023](#ref-touvron_llama_2023)). For a given notion $N$,
assuming the same amount of engineering effort, we expect the compression faced
by the language of rewards $LR$ to be higher than the compression faced by
natural language $NL$, i.e. we expect the following

$$
\text{H}(N_{LR}) < \text{H}(N_{NL}) \leq \text{H}(N).
$$

We reason that the language of rewards faces higher intrinsic compression due to
its scalar nature, rendering it more difficult to capture nuance than what would
be possible with the multidimensionality and compositionality of natural
language, which could not only encode more information directly, but could also
allow for factored representations which may more easily be leveraged for
generalization. Similarly, we expect the language of rewards to also face higher
extrinsic compression when compared to natural language. We reason that task
specification is a communication problem, and to this end natural language is
the most natural or "comfortable" interface we have as communicators. Rewards,
while succinct, may at times be awkward to specify due to the nature of the
tasks. This is for instance the case for sparse rewards awarded only upon task
completion, or for the denser proxy rewards awarded in the process of reward
shaping ([Ng, Harada, and Russell 1999](#ref-ng_policy_1999)).

## Defining GMG in the context of multi-task learning

Goal Misgeneralization is inherently Multi-task. Indeed, all definitions and
examples of GMG so far have implicitly defined a multi-task setup, with some
goal task $c_g$ and some other confounding task $c_c$. After all, the definition
of GMG implies the existence of at least one other task beyond the one intended
by the designers, as without such a task, it would be impossible for the model
to pursue it. We instead choose to explicitly define this multi-task setup,
relying on the framework from
[Wilson et al. (2007)](#ref-wilson_multi-task_2007).

Specifically, let $\mathcal{C} = \left\\{c_ i\right\\}_ {i=1}^N$ be a set of
discrete episodic tasks. This could for example the set of all tasks
$\mathcal{T}$ with natural language instructions $\mathcal{T}_ {NL}$, following
the notion and expression notation from the previous section. Let
$p_
\text{train}(\mathcal{C})$ and $p_ \text{test}(\mathcal{C})$ be the
distributions from which the tasks are sampled during training and testing
respectively. Each task $c_i$ then defines a separate MDP
$M_i = (S, A, R_i,
P_i)$, such that the reward and transition functions differ by
task. At training time we try to find a task-conditioned policy

$$
\pi : S \times \mathcal{C}
    \rightarrow \Delta (A),
$$

with an objective conductive to good performance across the tasks. For
multi-task RL, such an objective maximizes the expected reward over the
distribution of tasks, i.e.

$$
\pi^*_ \text{RL} = \underset{\pi \in \Pi}{\arg \max} \mathbb{E}_ {c \sim p_ {\text{train}}(C)}
    \left[\mathbb{E}_ {\pi_c}
        \left[\sum_{t=1}^{T_ c} \gamma^t R_ {t,c}\right]
        \right],
$$

where $T$ is the horizon of time steps $t$ and $\gamma$ is the discount factor.
For multi-task IL, such an objective minimizes the expected loss $L$ between
policy and expert behaviour over the distribution of tasks, i.e.

$$
\pi^*_ \text{IL} =
    \underset{\pi \in \Pi}{\arg \min } \mathbb{E}_ {c \sim p_ {\text {train }}(C)}
    \Bigg[\mathbb{E}_ {\pi_ {\varepsilon}}
    \big[L_ {c}\big]
    \Bigg].
$$

Given the above, we define _Goal misgeneralization (GMG)_ as the observed
phenomenon in which a system successfully trained to pursue a particular goal
$c_1$ in setting $X$ fails to generalize to a new setting $Y$ and instead
capably pursues a different goal $c_2$. A _goal_ in this definition can either
be a specific state (static) or a behaviour (dynamic). Note that we use the
words "task" and "goal" interchangeably, and will do so for the remainder of
this work. A system will be in _capable pursuit_ of a given goal if a metric $M$
describing the extent of goal achievement (e.g. success rate) is significantly
higher than the corresponding metric for most other goals in $\mathcal{C}$.
Mathematically, we say GMG happens if

$$
\exists c_1, c_2 \in \mathcal{C},~\text{s.t.}~p_\text{test}(c_1), p_\text{test}(c_1) > 0,
$$

and

$$
\mathbb{E}_ {\pi_ {c_ 1}}\left[ M_ {c_ 2}\right]>\mathbb{E}_ {\pi_ {c_ 1}}\left[M_ {c_ 1}\right].
$$

We place our definition in between those of
[Langosco et al. (2022)](#ref-langosco_goal_2022) and
[Shah et al. (2022)](#ref-shah_goal_2022), relaxing the former's reliance on RL
and [Orseau, McGill, and Legg (2018)](#ref-orseau_agents_2018)'s agents and
devices framework for simplicity, while focusing on SDM rather than the more
general case proposed by the latter, to avoid overly wide characterizations of
the phenomenon.

## Afterword

That's all for this excerpt. I hope you found it interesting. I do not claim
correctness or strong confidence in the ideas here, but figured it could attract
some interest and gather some peer review. This work was carried out between
Summer 2022 and October 2023 so may be a bit out of date. As mentioned you can
find the rest of the thesis [here](https://github.com/thesofakillers/nlgoals).
Thank you very much for reading!

## References

<!-- prettier-ignore-start -->
<a id=ref-bansal_specification-guided_2022></a> Bansal, Suguman. 2022.
"Specification-Guided Reinforcement Learning." In _Static Analysis_, edited by
Gagandeep Singh and Caterina Urban, 3--9. Lecture Notes in Computer Science.
Cham: Springer Nature Switzerland.
<https://doi.org/10.1007/978-3-031-22308-2_1>.

<a id=ref-brown_language_2020></a> Brown, Tom B., Benjamin Mann, Nick Ryder,
Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, et
al. 2020. 
"Language Models Are Few-Shot Learners." _arXiv:2005.14165 \[Cs\]_,
July. <http://arxiv.org/abs/2005.14165>.

<a id=ref-caruana_multitask_1997></a> Caruana, Rich. 1997. 
"Multitask Learning."
_Machine Learning_ 28 (1): 41--75. <https://doi.org/10.1023/A:1007379606734>.

<a id=ref-cho_multi-task_2022></a> Cho, Myungsik, Whiyoung Jung, and Youngchul
Sung. 2022. 
"Multi-Task Reinforcement Learning with Task Representation Method."
In _ICLR 2022 Workshop on Generalizable Policy Learning in Physical World_.
<https://openreview.net/forum?id=rV2zaEpNybc>.

<a id=ref-christiano_deep_2017></a> Christiano, Paul F, Jan Leike, Tom Brown,
Miljan Martic, Shane Legg, and Dario Amodei. 2017. 
"Deep Reinforcement Learning from Human Preferences." In _Advances in Neural Information Processing Systems_.
Vol. 30. Curran Associates, Inc.
<https://proceedings.neurips.cc/paper/2017/hash/d5e2c0adad503c91f91df240d0cd4e49-Abstract.html>.

<a id=ref-de_haan_causal_2019></a> de Haan, Pim, Dinesh Jayaraman, and Sergey
Levine. 2019. 
"Causal Confusion in Imitation Learning." In _Advances in Neural
Information Processing Systems_. Vol. 32. Curran Associates, Inc.
<https://proceedings.neurips.cc/paper/2019/hash/947018640bf36a2bb609d3557a285329-Abstract.html>.

<a id=ref-devlin_bert_2019></a> Devlin, Jacob, Ming-Wei Chang, Kenton Lee, and
Kristina Toutanova. 2019. 
"BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding." In _Proceedings of the 2019 Conference
of the North American Chapter of the Association for Computational Linguistics:
Human Language Technologies, Volume 1 (Long and Short Papers)_, 4171--86.
Minneapolis, Minnesota: Association for Computational Linguistics.
<https://doi.org/10.18653/v1/N19-1423>.

<a id=ref-frankish_cambridge_2014></a> Frankish, Keith, and William M.
Ramsey. 2014. _The Cambridge Handbook of Artificial Intelligence_. Cambridge
University Press.

<a id=ref-gupta_can_2022></a> Gupta, Gunshi, Tim G. J. Rudner, Rowan Thomas
McAllister, Adrien Gaidon, and Yarin Gal. 2022. 
"Can Active Sampling Reduce Causal Confusion in Offline Reinforcement
Learning?" In _NeurIPS ML Safety Workshop_.
<https://openreview.net/forum?id=FL6-zXu4s8O>.

<a id=ref-hoffmann_training_2022></a> Hoffmann, Jordan, Sebastian Borgeaud,
Arthur Mensch, Elena Buchatskaya, Trevor Cai, Eliza Rutherford, Diego de Las
Casas, et al. 2022. 
"Training Compute-Optimal Large Language Models." arXiv.
<https://doi.org/10.48550/arXiv.2203.15556>.

<a id=ref-kaplan_scaling_2020></a> Kaplan, Jared, Sam McCandlish, Tom Henighan,
Tom B. Brown, Benjamin Chess, Rewon Child, Scott Gray, Alec Radford, Jeffrey Wu,
and Dario Amodei. 2020. 
"Scaling Laws for Neural Language Models." arXiv.
<https://doi.org/10.48550/arXiv.2001.08361>.

<a id=ref-kirk_causal_2022></a> Kirk, Robert, and David Krueger. 2022. 
"Causal Confusion as an Argument Against the Scaling Hypothesis." _The AI
Alignment Forum_
<https://www.alignmentforum.org/posts/FZL4ftXvcuKmmobmj/causal-confusion-as-an-argument-against-the-scaling>.

<a id=ref-lange_batch_2012></a> Lange, Sascha, Thomas Gabel, and Martin
Riedmiller. 2012. 
"Batch Reinforcement Learning." In _Reinforcement Learning:
State-of-the-Art_, edited by Marco Wiering and Martijn van Otterlo,
45--73. Adaptation, Learning, and Optimization. Berlin, Heidelberg: Springer.
<https://doi.org/10.1007/978-3-642-27645-3_2>.

<a id=ref-langosco_goal_2022></a> Langosco, Lauro Langosco Di, Jack Koch, Lee D.
Sharkey, Jacob Pfau, and David Krueger. 2022. 
"Goal Misgeneralization in Deep Reinforcement Learning." In _Proceedings of the
39th International Conference on Machine Learning_, 12004--19. PMLR.
<https://proceedings.mlr.press/v162/langosco22a.html>.

<a id=ref-levine_offline_2020></a> Levine, Sergey, Aviral Kumar, George Tucker,
and Justin Fu. 2020. 
"Offline Reinforcement Learning: Tutorial, Review, and Perspectives on Open
Problems." arXiv. <https://doi.org/10.48550/arXiv.2005.01643>.

<a id=ref-ng_policy_1999></a> Ng, Andrew Y., Daishi Harada, and Stuart J.
Russell. 1999. 
"Policy Invariance Under Reward Transformations: Theory and Application to
Reward Shaping." In _Proceedings of the Sixteenth International Conference on
Machine Learning_, 278--87. ICML '99. San Francisco, CA, USA: Morgan Kaufmann
Publishers Inc.

<a id=ref-orseau_agents_2018></a> Orseau, Laurent, Simon McGregor McGill, and
Shane Legg. 2018. 
"Agents and Devices: A Relative Definition of Agency." arXiv.
<https://doi.org/10.48550/arXiv.1805.12387>.

<a id=ref-prudencio_survey_2022></a> Prudencio, Rafael Figueiredo, Marcos R. O.
A. Maximo, and Esther Luna Colombini. 2022. 
"A Survey on Offline Reinforcement Learning: Taxonomy, Review, and Open
Problems." arXiv. <https://doi.org/10.48550/arXiv.2203.01387>.

<a id=ref-puterman_markov_2014></a> Puterman, Martin L. 2014. _Markov Decision
Processes: Discrete Stochastic Dynamic Programming_. John Wiley & Sons.

<a id=ref-shah_goal_2022></a> Shah, Rohin, Vikrant Varma, Ramana Kumar, Mary
Phuong, Victoria Krakovna, Jonathan Uesato, and Zac Kenton. 2022. 
"Goal Misgeneralization: Why Correct Specifications Aren't Enough For Correct
Goals." arXiv. <https://doi.org/10.48550/arXiv.2210.01790>.

<a id=ref-shannon_mathematical_1948></a> Shannon, C. E. 1948. 
"A Mathematical Theory of Communication." _The Bell System Technical Journal_
27 (3): 379--423. <https://doi.org/10.1002/j.1538-7305.1948.tb01338.x>.

<a id=ref-touvron_llama_2023></a> Touvron, Hugo, Thibaut Lavril, Gautier
Izacard, Xavier Martinet, Marie-Anne Lachaux, Timothée Lacroix, Baptiste
Rozière, et al. 2023. 
"LLaMA: Open and Efficient Foundation Language Models." arXiv.
<https://doi.org/10.48550/arXiv.2302.13971>.

<a id=ref-vamplew_scalar_2022></a> Vamplew, Peter, Benjamin J. Smith, Johan
Källström, Gabriel Ramos, Roxana Rădulescu, Diederik M. Roijers, Conor F. Hayes,
et al. 2022. 
"Scalar Reward Is Not Enough: A Response to Silver, Singh, Precup and Sutton
(2021)." _Autonomous Agents and Multi-Agent Systems_ 36 (2): 41.
<https://doi.org/10.1007/s10458-022-09575-5>.

<a id=ref-wilson_multi-task_2007></a> Wilson, Aaron, Alan Fern, Soumya Ray, and
Prasad Tadepalli. 2007. 
"Multi-Task Reinforcement Learning: A Hierarchical Bayesian Approach." In
_Proceedings of the 24th International Conference on Machine Learning_,
1015--22. ICML '07. New York, NY, USA: Association for Computing Machinery.
<https://doi.org/10.1145/1273496.1273624>.
<!-- prettier-ignore-end -->

[^1]:
    We use the term _Sequential Decision Making_ (SDM) to refer to the field
    studying problems and approaches wherein an artificial agent interacts with
    an environment in the process of pursuing and eventually achieving a
    specific goal ([Frankish and Ramsey, 2014](#ref-frankish_cambridge_2014)).
    In this context, we envision the agent as acting according to some policy
    $\pi$ which maps states $S$ to actions $A$. States are instantaneous
    representations of the environment, descriptions of the environment at a
    given moment. Actions are motions and outputs produced by the agent that may
    affect the state of the environment. We model the interaction between the
    agent and the environment as unfolding over discrete time steps. At each
    time step, the agent observes the state, consults its policy $\pi$ to select
    an action, and then executes that action. In the next time step, the
    environment responds by transitioning to a new state, and the loop
    continues. In other words, the formalism for problems typically studied in
    Reinforcement Learning and/or Imitation Learning under the Markov Decision
    Process (MDP) framework [(Puterman 2014)](#ref-puterman_markov_2014)

[^2]:
    This generalizes self-proposed tasks, in which the actor is also the
    requester $\mathcal{A}=\mathcal{R}$.
