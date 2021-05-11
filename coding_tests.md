# Various Coding Tests Done in Elixir

## Overview

There doesn't seem to be a strong consensus on what makes a good coding test to judge for competence in Elixir. It's a mixed bag between take home, online challenge style and live coding. I strongly prefer the take home as it feels a bit more real world but is also generally more of a time commitment.

Elixir is a pretty mature community by default as many devs land here after they've tried everything else. You should more or less expect that unless the job is explicitly labelled 'junior' they will also expect you to have a decent knowledge of the whole web stack (HTML, CSS, JS, HTTP), SQL, shell, git as a minimum.

## [Chuck](https://github.com/GenericJam/chuck)

Chuck is a coding test to show some understanding of how to build a backend. It fetches jokes from the Chuck Norris Joke API. This was a take home assignment and I landed the job. It said to do it in four hours but I could take as long as I wanted. I took ten hours to make sure it was complete and relatively polished.

### Brief

We want you to build an application in Elixir that will:
Display a list of jokes from the [Chuck Norris API](https://api.chucknorris.io/#!

* Allows a user to favourite jokes.
* Allows a user to retrieve their favourite jokes.
* Allows a user to share his favourite jokes with another user.

The only requirements other than the functionality above are:

* All actions should be accessible through HTTP, this does not mean it needs
a visual interface, an API is fine too.
* You should not use an external database.

The goal of this assignment is to use as a basis for discussion in the technical
interview. You should not spend more than 4 hours on this assignment (you are
free to do so however).

## [List Ops](https://github.com/GenericJam/list_ops)

The screening test of the same company as the FlyWheel test. I guess the idea being that if you don't know anything about recursion that's enough to want to keep you out of their code base. The exercise is to implement some common List operations like `Map`, etc. The tests were included but the functions were empty. 
 
 If you want to reenact without my solutions, just clone and remove the contents of the functions. After the fact I found it on [exorcism](https://exercism.io/my/solutions/c6b27347d59c49babcc175cdb4a6dd05). I guess you could take that as an indicator that exercism is a good resource for learning and preparing for a coding test.

## [FlyWheel](https://github.com/GenericJam/FlyWheel)

This is a coding test with some concepts from the target industry. It was a live coding pairing session with tests and mostly empty function bodies with the task of making the tests pass. It was over Zoom running on my machine. I only got the one set of tests working in the allotted time and finished the rest later. Sometimes live coding can be really stressful but this was a lot more relaxed due to the reassuring pairing devs. It went pretty well and I would expect to see a job offer after this sort of result.

If you want to reenact without my solutions, just clone and remove the contents of the functions.

## [Snuflake](https://github.com/GenericJam/Snuflake)

The screening test for the same company that I also wrote Ring and Dictionary for. They wanted an id that robustly creates new IDs that you could have some guarantees that you wouldn't duplicate them in the future. I base my implementation off of [Snowflake IDs](https://en.wikipedia.org/wiki/Snowflake_ID). There was an emphasis on a quick as possible so it is made using bitstrings and is pretty fast.

There was of course no points for nuance here but...

S+now+flake -> 'now' translated to Dutch 'nu' -> S+nu+flake.

### Brief 
Imagine you are building a system to assign unique numbers to each host that you manage. You want the ids to be guaranteed unique i.e. no UUIDs. Since these ids are globally unique, each id can only be given out at most once. The ids are 64 bits long.

Your service is composed of a set of nodes, each running one process serving ids. A caller will connect to one of the nodes and ask it for a globally unique id. There are a fixed number of nodes in the system, up to 1024. Each node has a numeric id, 0 <= id <= 1023. Each node knows its id at startup and that id never changes for the node.

When a caller requests a new id, the node it connects to calls its internal get_id function to get a new, globally unique id. The last_id that the node gave out is passed as a parameter to get_id.

Your task is to implement get_id (interface below). You are given helper functions for getting the node id and the current timestamp. There is no need to implement these functions.

```elixir
defmodule GlobalId do
  @moduledoc """
  GlobalId module contains an implementation of a guaranteed globally unique id system.     
  """

  @doc """
  Please implement the following function.
  64 bit non negative integer output   
  """
  @spec get_id(non_neg_integer) :: non_neg_integer
  def get_id(last_id) do
      
  end

  #
  # You are given the following helper functions
  # Presume they are implemented - there is no need to implement them. 
  #

  @doc """
  Returns your node id as an integer.
  It will be greater than or equal to 0 and less than or equal to 1024.
  It is guaranteed to be globally unique. 
  """
  @spec node_id() :: non_neg_integer
  def node_id 

  @doc """
  Returns timestamp since the epoch in milliseconds. 
  """
  @spec timestamp() :: non_neg_integer
  def timestamp
end
```

You may add other functions to the implementation in order to complete your solution. If you must modify the interface to get_id to complete your solution, please provide an explanation as to why this change is necessary.

Assume that any node will not receive more than 100,000 requests per second.

Please choose a structure for your global id and describe it. For each part of your structure, please explain why it is necessary and include any defining information such as size (in bits). If applicable, explain how the size of the section is related to the maximal request rate per node.

We will evaluate your solution for correctness, simplicity, clarity, and robustness. Providing tests is a huge plus.
## [Ring](https://github.com/GenericJam/Ring)

A live coding test the point of which still escapes me. It was online via coderpad. The task was to create a list as a [ring](https://en.wikipedia.org/wiki/Linked_list#Circularly_linked_vs._linearly_linked). This is relatively simple to do in a language like C. You implement a linked list where the tail points back to the head. The BEAM _really_ doesn't want to do this. If I had remembered [digraph](https://erlang.org/doc/man/digraph.html) I should have used that. Without digraph the next best thing is to implement it on top of a map which also is a bit stupid. In order to isolate it and make it sort of self contained and 'built in' akin to what pointers are I put it in the process dictionary. It really stumped me for a while. I didn't finish within the hour. I had to finish it later.

If I had to do this for real a) I wouldn't and b) I would use `ets` over the process dictionary.

The reason the BEAM doesn't want to do it is you need a mutable structure somewhere in the equation. This is why BEAM lists are constructed back to front, the reference to the next is embedded in the previous node. There's no way to modify the last list node to point to the first one.

### Brief

No brief as this was just verbal instruction in the context of the test. Just imagine having to recreate a circular structure where one node refers to the next and the next... and the last refers to the first.
Need to be able to create a ring, add a node, move between nodes as a minimum.

## [Dictionary](https://github.com/GenericJam/Dictionary)

A coding test with some concepts from the target industry in that they need a way to identify a key with multiple versions. It was a live coding pairing session using coderpad which is an online editor that both the pair coder/interviewer and I could access. I didn't get the job on the failure of this and the Ring list. They didn't like that my `get` function would have taken too long to run which in retrospect is kind of obvious but these solutions don't occur to you until later sometimes. I should have done a nested map so the key would pull another map with version of the key so that a `nil` key would get the latest version.

I'm really not a fan of live coding in the first place and the unfamiliarity of the online editor added to the stress of the situation. I guess some companies want people to perform well under stress so perhaps this is a valuable screening device for them. The online coding platform had a similar form of interaction as Hacker Rank where there is an implied command line area where you execute your code.

Ring and Dictionary were right after each ather so I didn't pass one and fail the other. I didn't get the job that I wrote Snuflake, Ring and Dictionary for.

### Brief

Need to implement a `Map` module akin to the one built into Elixir except that it also carries a version as part of its key which if version is `nil` returns the most recent version.

```elixir
%{ %{key: :yo, version: 1}, value:  "dog"}
```

## [Exercism](https://exercism.io/my/tracks/elixir)

Exercism doesn't seem to have a testing tier but that won't stop companies from using their exercises as coding tests. See List Ops. This seems like a good place to practice. Worth noting there doesn't seem to be any exercises for network stuff, spawning, inter process communication, supervisors, or anything else that sets Elixir apart, all of which I would think of as fair game for a coding test.

## Hacker Rank

Using Hacker Rank to discover talent among Elixir devs is like using your bathtub to discover if your toaster is on. It's sort of antioptimised for Elixir and the BEAM in general and assumes that every language is a lesser cousin of C. It creates interop by reading/writing everything from/to stdin. You may have guessed this is almost the worst way to interact with Elixir.

Nevertheless not all employers have gotten the memo so you may need to be prepared for a Hacker Rank test or a live coding test that is a Hacker Rank 'guess the algorithm we're thinking of' type test. I recommend signing up for Hacker Rank and do at least a handful of problems there to prepare for the eventuality of facing them.

This is really just for coding tests not for learning Elixir. It does a pretty terrible job of teaching you anything about Elixir.

[These examples just give an idea of how to interact with Hacker Rank and are not necessarily optimal solutions to these problems.](https://github.com/GenericJam/HackerRank)
