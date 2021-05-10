# Various Coding Tests Done in Elixir

## Overview

There doesn't seem to be a strong consensus on what makes a good coding test to judge for competence in Elixir. It's a mixed bag between take home, online challenge style and live coding. I strongly prefer the take home as it feels a bit more real world but is also generally more of a time commitment.

Elixir is a pretty mature community by default as many devs land here after they've tried everything else. You should more or less expect that unless the job is explicitly labelled 'junior' they will also expect you to have a decent knowledge of the whole web stack (HTML, CSS, JS, HTTP), SQL, shell, git as a minimum.

## Chuck

[Chuck](https://github.com/GenericJam/chuck) is a coding test to show some understanding of how to build a backend. It fetches jokes from the Chuck Norris Joke API. This was a take home assignment and I landed the job.

## List Ops

[List Ops](https://github.com/GenericJam/list_ops) is the screening test so one of two of the same company as FlyWheel. I guess the idea being that if you don't know anything about recursion that's enough to want to keep you out of their code base. The exercise is to implement some common List operations like `Map`, etc. The tests were included but the functions were empty.

## FlyWheel

[FlyWheel](https://github.com/GenericJam/FlyWheel) is a coding test with some concepts from the target industry. It was a live coding pairing session with tests and mostly empty function bodies with the task of making the tests pass. It was over Zoom running on my machine. I only got the one set of tests working in the allotted time and finished the rest later. Sometimes live coding can be really stressful but this was a lot more relaxed due to the reassuring pairing devs. It went pretty well and I would expect to see a job offer after this sort of result.

## Snuflake 
[Snuflake](https://github.com/GenericJam/Snuflake) is the screening test for the same company that I also wrote Ring and Dictionary for. They wanted an id that robustly creates new IDs that you could have some guarantees that you wouldn't duplicate them in the future. I base my implementation off of [Snowflake IDs](https://en.wikipedia.org/wiki/Snowflake_ID). There was an emphasis on a quick as possible so it is made using bitstrings and is pretty fast.

There was of course no points for nuance here but...

S+now+flake -> 'now' translated to Dutch 'nu' -> S+nu+flake.

## Ring

[Ring](https://github.com/GenericJam/Ring) was a live coding test the point of which still escapes me. It was online via coderpad. The task was to create a list as a ring. This is relatively simple to do in a language like C. You implement a linked list where the tail points back to the head. The BEAM _really_ doesn't want to do this. If I had remembered [digraph](https://erlang.org/doc/man/digraph.html) I should have used that. Without digraph the next best thing is to implement it on top of a map which also is a bit stupid. In order to isolate it and make it sort of self contained and 'built in' akin to what pointers are I put it in the process dictionary. It really stumped me for a while. I didn't finish within the hour. I had to finish it later.

If I had to do this for real a) I wouldn't and b) I would use `ets` over the process dictionary.

The reason the BEAM doesn't want to do it is you need a mutable structure somewhere in the equation. This is why BEAM lists are constructed back to front, the reference to the next is embedded in the previous node. There's no way to modify the last list node to point to the first one.

## Dictionary

[Dictionary](https://github.com/GenericJam/Dictionary) is a coding test with some concepts from the target industry in that they need a way to identify a key with multiple versions. It was a live coding pairing session using coderpad which is an online editor that both the pair coder/interviewer and I could access. I didn't get the job on the failure of this and the Ring list. They didn't like that my `get` function would have taken too long to run which in retrospect is kind of obvious but these solutions don't occur to you until later sometimes. I should have done a nested map so the key would pull another map with version of the key so that a `nil` key would get the latest version.

I'm really not a fan of live coding in the first place and the unfamiliarity of the online editor added to the stress of the situation. I guess some companies want people to perform well under stress so perhaps this is a valuable screening device for them. The online coding platform had a similar form of interaction as Hacker Rank where there is an implied command line area where you execute your code.

I didn't get the job that I wrote Snuflake, Ring and Dictionary for.

## Hacker Rank

Using Hacker Rank to discover talent among Elixir devs is like using your bathtub to discover if your toaster is on. It's sort of antioptimised for Elixir and the BEAM in general and assumes that every language is a lesser cousin of C. It creates interop by reading/writing everything from/to stdin. You may have guessed this is almost the worst way to interact with Elixir.

Nevertheless not all employers have gotten the memo so you may need to be prepared for a Hacker Rank test or a live coding test that is a Hacker Rank 'guess the algorithm we're thinking of' type test. I recommend signing up for Hacker Rank and do at least a handful of problems there to prepare for the eventuality of facing them.

This is really just for coding tests not for learning Elixir. It does a pretty terrible job of teaching you anything about Elixir.

[These examples just give an idea of how to interact with Hacker Rank and are not necessarily optimal solutions to these problems.](https://github.com/GenericJam/HackerRank)
