# contexts

This folder contains React contexts that are reused across application features.

Here are some useful tips regarding contexts from Kent Dodd's article
[How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

1. You shouldn't be reaching for context to solve every state sharing problem
   that crosses your desk.
2. Context does NOT have to be global to the whole app, but can be applied to
   one part of your tree
3. You can (and probably should) have multiple logically separated contexts in
   your app.
