# Shoutah

A very simple social network that currently only supports manual addition of new users and non-secure log in.

## Considerations

### spread operator vs object.assign

more readable but less stable?

### structure

should reducers be in the same folder as their actions or separate?

### dom structure

one big app component or separate components rendered individually?

### components

i think a separation of functional and visual components is a good idea, but do we allow ambiguous components? should all functional components connect to a visual component or can we have some overlap? each option adds and removes different kinds of complexity

### state

how deep do we want to go with state? should the contents of text boxes be registered in redux?