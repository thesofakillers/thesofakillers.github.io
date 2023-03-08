+++
draft = false
date = 2023-03-08T16:23:51+01:00
title = "Power-Seeking in RL: Quick Summary"
description = "A quick summary of Turner et al.'s 'Optimal Policies Tend to Seek Power'"
slug = "power-seeking-summary"
tags = ["AI Safety", "Reinforcement Learning"]
+++

The following is an adaptation of part of my (unsuccessful) application to the
Winter 2022 cohort of [SERI MATS](https://www.serimats.org/), as prompted by
[Victoria Krakovna](https://vkrakovna.wordpress.com/)'s "Explain the
power-seeking theorems in the reinforcement learning setting in your own words"

I realise that nowadays, high-level summaries of this kind provide little value
as summarizing bots have reached a very acceptable level. I am publishing to get
into the habit of posting more.

So, **Epistemic Status:** Rendered obsolete by ChatGPT et al.

---

An action or behaviour is _instrumental_ to an objective when it helps achieve
that objective. When this action or behaviour is instrumental to a range of
objectives, it said to be _convergently instrumental._

The power seeking theorem outlined in [1] formalises the notion that _power
seeking_ is convergently instrumental. That is, it mathematically shows that
power seeking is helpful in achieving a wide range of objectives under certain
conditions, by considering the power-seeking tendencies of optimal policies in
finite MDPs.

Here, _power_ is formalised as the ability to achieve a wide variety of goals.
To “seek” power, an action leads an agent to a state with greater power.
Mathematically, the authors express power as a modified version of average
optimal value. That is, the optimal _value_ averaged over a range of goals.
_Value_ is simply the expected return, or the expected sum of rewards when
acting under a given policy. The optimal value is then the maximum achievable
value, which is obtained when acting under an optimal policy. Note that a goal
is formalised as the maximisation of a reward function.

The authors’ formalisation rests on the use of optimal policies as the
representation of intelligent agents, and considers the setting of a Markov
Decision Process (MDP), i.e. assuming the environment is fully observable. Under
these premises, the authors show that certain graphical symmetries in MDPs cause
optimal policies to tend to seek power. They note that optimal policies will
avoid visiting terminal states when possible, and prefer states with higher
optionality.

## References

[1] A. Turner, L. Smith, R. Shah, A. Critch, and P. Tadepalli, ‘Optimal Policies
Tend To Seek Power’, in _Advances in Neural Information Processing Systems_,
2021, vol. 34, pp. 23063–23074. [Online]. Available:
https://proceedings.neurips.cc/paper/2021/hash/c26820b8a4c1b3c2aa868d6d57e14a79-Abstract.html
