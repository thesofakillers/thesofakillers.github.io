+++
draft = false
date = 2023-03-08T14:40:58+01:00
title = "Agency, LLMs and AI Safety - A First Pass"
description = "Initial thoughts on the relationship between agency, language models and safety"
slug = "aisafety-llm-agency"
tags = ["AI Safety", "Language Models", "Agency"]
+++

The following is an adaptation of part of my (unsuccessful) application to the
Winter 2022 cohort of [SERI MATS](https://www.serimats.org/), as prompted by
[Victoria Krakovna](https://vkrakovna.wordpress.com/)'s "What is your favorite
definition of agency, and how would you apply it to a language model?"

This is far from a perfect treatment of the topic, but I am publishing it to
document my early days in the field. Or should I say "**Epistemic status**: I am
learning".

---

I am interested in this question because it is one which came up over the summer
when I got more interested in AI Safety. In my readings of LessWrong and
technical AI Safety Research surveys, I started to question the need for agency
in AI models in the first place.
[It seemed to me that most hypotheses about future AGI scenarios involved a notion of agency](https://ai.stackexchange.com/q/36560/55107)
in the model(s) considered, but it was unclear to me what advantages developing
agentic models would provide to humans. I thought that if agency was not
essential, then perhaps a “compromise” between safety and AGI capabilities could
be achieved by relying on oracle-like models, devoid of agency but useful for
guidance and whose answers and recommendations we could ultimately
reject[^persuasiveoracle]. I asked a
[related question on the AI stackexchange forum](https://ai.stackexchange.com/q/36555/55107)
but unfortunately was met with confusion and ultimately my question was closed
as I had made the very obvious mistake of not defining my terms. In an attempt
(which never succeeded) to resuscitate the discussion, I proposed the following
definition of agency:

> I define **agency** as the ability to *autonomously* perceive and interact
> with a given environment. Anything capable of agency is then an **agent**.
> Furthermore, I define
>
> - ***autonomous* perception**: the ability to perceive a given environment
>   without the need of an external agent
> - **interaction**: the ability to change the state of the environment

I liked (and still like) my definition, but admittedly I have not tried
evaluating it[^victoriafeedback]. One issue is that I did not develop it in
isolation: my bias was that language models are tools, not agents and purposely
defined agency backwards from this claim. As such it is (perhaps artificially)
difficult to apply this definition of agency to language models. The choice of
environment for a language model is trivial: it can be anything whose state can
be represented (noisily) through language. The “interaction” requirement of the
definition can in a sense be met by a LM capable of influencing and influencing
the actions of agents that form and can in their turn form the LM’s environment.
For example, when prompted, an LM could output a recipe which could then be
realised in the real world by a human. In this sense, the LM is interacting with
the environment, albeit indirectly. The “autonomous perception” requirement is
instead a bit more difficult to be met by a LM. A LM’s perception of its
environment is limited to the textual inputs that someone has to provide. With
multimodal LMs, the inputs are no longer limited to text, but still need to be
inputted by someone. It is only once a LM is coupled with something capable of
agency (a human, or say, a RL policy guiding sensors) that it can receive inputs
and perceive its environment.

Of the readings suggested, my favorite is Barandian et al.’s definition of
agency [1], reported in [2], as it seemed the most focused and less brittle to
confusion with other terms such as “goal-directedness” and “optimization” which
may have overlap with agency but may also not be entirely the same. The
definition is as follows:

> agency involves, at least, a system doing something by itself according to
> certain goals or norms within a specific environment.
>
> In more detail, agency requires:
>
> 1. Individuality: the system is capable of defining its own identity as an
>    individual and thus distinguishing itself from its surroundings; in doing
>    so, it defines an environment in which it carries out its actions;
> 2. Interactional asymmetry: the system actively and repeatedly modulates its
>    coupling with the environment (not just passive symmetrical interaction);
> 3. Normativity: the above modulation can succeed or fail according to some
>    norm.

It is once again difficult to recognise agency in language models under this
definition. We can work through the requirements and see why. Note that I will
treat each requirement assuming the other two requirements are satisfied.
However do also note that the authors indicate that each requirement is
co-dependent on the satisfaction of the others.

1. A LM’s capability of defining its own identity is debatable. Modern LM’s are
   certainly able to produce output stating something along the lines of “I am a
   language model, I distinguish myself from my surrounding because […].” That
   is, it is possible that such an output will be produced. However, can this be
   considered as the LM defining its own identity? Firstly, the LM needs to be
   non-trivially prompted to produce such an output. Secondly, by nature of
   their training objective, assuming a decoder-only GPT-like LM, the output is
   simply what the model weights compute to be the most likely completion of the
   previous tokens provided in the prompt. It is therefore controversial whether
   the model even “knows” that it is defining itself, which seems like a
   necessary condition for an agent to define itself in words. In a sense, any
   self-reference and/or self-maintenance which the authors outline as
   definitional for individuality would seem to be an “act” in the case of
   language models.
2. I like this requirement because it is similar to the “autonomous perception
   and interaction” requirements present in my definition. In this case, a
   similar evaluation for whether LM’s can meet this requirement is concluded:
   because any actions performed (outputs emitted) by a LM are caused by at most
   a chain of inputs originating at some input provided by an external agent,
   LMs do not meet the interactional asymmetry requirement, at least not in
   their current form.
3. It can be more easily argued that LMs meet the normativity requirement.
   Because they are trained with one (or more) objective functions, the
   resulting LM acts to satisfy some goal (which the authors use interchangeably
   with “norm”), that is finding and outputting the most likely completion to
   their inputs. This norm is encoded in the network parameters and as such is
   generated by the system itself.

In general, it seems difficult to reconcile satisfactory definitions of agency
and viewing language models as agents. I am nevertheless very interested in the
question, and do not rule out more appropriate definitions being developed and
tested, and different interpretations and understandings of language models that
I have not yet considered. I think this is an important question to consider,
given the possibility of agency emerging in models not explicitly designed to be
agentic. Having a definition of the word could aid us in recognising such a
scenario.

## References

[1] Barandiaran XE, Di Paolo E, Rohde M. Defining Agency: Individuality,
Normativity, Asymmetry, and Spatio-temporality in Action. _Adaptive Behavior_.
2009;17(5):367-386. doi:10.1177/1059712309343819

[2]
[Literature Review on Goal-Directedness](https://www.lesswrong.com/posts/cfXwr6NC9AqZ9kr8g/literature-review-on-goal-directedness)

[^persuasiveoracle]:
    I recognise this is somewhat naive - a sufficiently intelligent oracle could
    provide answers persuasive enough that we don't even consider their
    rejection.

[^victoriafeedback]:
    Victoria _had_ to evaluate it as part of my application, and said the
    following: "your definition of agency was a bit circular - you defined
    agency in terms of autonomy, and autonomy in terms of not needing an
    external agent." I agree this is valid criticism.
