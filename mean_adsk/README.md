# Building a MEAN Web Application

Hello!

This workshop is designed to introduce you to the [MEAN stack](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=what+is+mean+stack). It assumes you're starting at close to absolute zero: no development experience, never written any JavaScript code previously, and coming in with just a willingness to learn through practice. 

The workshop is 1/4 lecture and 3/4 hands-on, with the first 60 minutes dedicated to conceptual coverage of HTML, JavaScript, MVC, and MEAN. The following 180 minutes is dedicated to building your first MEAN web application and deploying it to the cloud.

Good luck!

## Table Of Contents
* [Setting Up Your Cloud Environment](#setting-up-your-cloud-environment)
* [Setting up the database](instructions/branch0.md) 
* [Setting up routes](instructions/branch1.md)
* [Building the Angular front-End](instructions/branch2.md) 
* [Workshop Format](#workshop-format)

## Setting Up Your Cloud Environment
This should take no more than 30 minutes. If you're stuck on any one step for more than a couple mintues, ask for help. If you finish early, look to help. 

Let's get started!

###Fork the repo
[Fork](https://help.github.com/articles/fork-a-repo/) the **mean_adsk** repo you've been invited to: 

![](http://i68.tinypic.com/264rgao.jpg) 

Keep this window on GitHub open as we'll come back to it shortly.

###Create the MEAN container
Now we'll create our [CodeAnywhere cloud environment](https://codeanywhere.com/). Sign up for a [CodeAnywhere account](https://codeanywhere.com), and if use your GitHub account, you can do it in one click. 

Scroll down and select the **MEAN Ubuntu 14.04 version** container. Make sure to name the container before creating it. 

![](http://i68.tinypic.com/27y3nmv.png) 

[Didn't see that screen? Try this optional step: Go to **File > New Connection > Container** , and then scroll down and select **MEAN Ubuntu 14.04 version**. Make sure to name the container.]

Did you know that our very own ADSK engineers are primary contributors to the [mean.io](http://mean.io/#!/) project. Check out their Slack [channel](https://autodesk.slack.com/messages/gamedev-website/details/) and join the conversation.

###Clone the repo
In CodeAnywhere, open an **SSH Terminal** by right-clicking on your new container: 

![](http://i68.tinypic.com/33axpog.jpg)

We're going to [clone](https://help.github.com/articles/cloning-a-repository/) the repository we forked earlier to our CodeAnywhere cloud environment. Go to your open GitHub window and copy the repository link with the **Clone with HTTPS** option: 

![](http://i64.tinypic.com/szhhd4.jpg) 

Once you've copied the link, go back to the SSH terminal in CodeAnywhere and type in the following command followed by pasting the repository link (Ctrl+A then Ctrl+V): 
 
   `git clone [PASTE REPO LINK HERE]`

[You may get challenged here to enter your GitHub username and password]

Do you see a **mean_adsk** folder on the left-hand side of the CodeAnywhere environment? No? Right-click the container and **Refresh**. 

![](http://i63.tinypic.com/52yzyq.jpg)

Now navigate to **mean_adsk** using the following command: 

  `cd mean_adsk`

We'll also run the following two commands, one line at a time (Disregard any nasty error messages):
 
   `git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done`
   
   `git fetch --all`

[You may get challenged for your GitHub credentials after the `git fetch --all` command]

What's up with all these [git commands](https://services.github.com/kit/downloads/github-git-cheat-sheet.pdf)?

###Checkout the starter branch
Next, run the following command to verify you have all of the available [branches](https://guides.github.com/activities/hello-world/) If you want to learn more about branches, go [here](https://git-scm.com/book/en/v1/Git-Branching-What-a-Branch-Is):
 
   `git branch`

At this point, it should be around 15 minutes into the build part of the workshop. If more than 30 minutes has transpired, check in with the facilitator.

Checkout the starter branch:
 
   `git checkout starter`

###Install dependencies
We need to [install dependencies](https://docs.npmjs.com/cli/install) with the following command: 

   `npm install`

###Set current working directory
Open your connection's config file by right-clicking on your container and choosing "Config":

![](http://i66.tinypic.com/315bkep.jpg) 

In your config file, set the current working directory to point to your `mean_adsk` directory:  

   `"cwd": "~/workspace/mean_adsk"` 

![](http://i66.tinypic.com/2ljkivq.jpg)

Remember to save often when you're editing files. 

That's it.

You've finished creating and configuring your first cloud development environment. You installed absolutely nothing locally, and you've accomplished all of those tasks just using Chrome. 

Welcome to the **new** normal.

##Workshop Format
We will be using a pre-configured MEAN container on a virtual integrated development environment. It comes preloaded with some of our dependencies, and will have many folders already in place. You can safely ignore all of the folders and files in the container _except_ for the folder that contains our respository (`mean_adsk`).

Failure is totally acceptable here and we find it an important part of learning. But we don't want that to stop you from progressing. We've made solutions available for each of the corresponding branches. For instance, Branch1 will contain all of the solution code from both Branch0 and Branch1.  

- Starter: This branch is going to be your main branch for development
- Branch0: Solution for database connection and model setup
- Branch1: Solution for API routes and Angular routes setup
- Branch2: Solution for Angular code and HTML view code

You can checkout any of the solution branches using the following command in the CodeAnywhere SSH terminal: 

   `git checkout [BRANCH NAME]`

## Next Section

[Setting up the database](instructions/branch0.md) 