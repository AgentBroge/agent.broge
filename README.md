### Note

Agent Broge is built on the foundation of a concept developed by another well-known developer. This serves as our baseline to expand and grow Agent Broge into a powerful and unique AI-driven tool, setting it apart with additional features and improvements tailored to our vision.

---

### Agent Broge

Agent Broge is the ultimate AI-powered productivity solution designed to revolutionize how you interact with your computer. With its intuitive interface and powerful capabilities, it offers unparalleled automation and efficiency, setting the foundation for a new era of AI-driven tools.

### Introduction

Welcome to Agent Broge, a cutting-edge AI assistant that seamlessly integrates with your computer to enhance productivity and streamline complex workflows. Leveraging advanced AI capabilities, Agent Broge acts as a bridge between human creativity and machine precision, making your daily tasks faster and smarter.

Presenting **Agent Broge**: the easiest way to let Claude's new [computer use](https://www.anthropic.com/news/3-5-models-and-computer-use) capabilities take over your computer!

### Demo Video

<video controls>
  <source src="https://raw.githubusercontent.com/AgentBroge/agent.broge/main/assets/agent.broge.3 demo.mp4" type="video/mp4">
  Your browser does not support the video tag. [Download the video](https://raw.githubusercontent.com/AgentBroge/agent.broge/main/assets/agent.broge.3 demo.mp4)
</video>

### Motivation

I wanted to see how good Claude's new [computer use](https://www.anthropic.com/news/3-5-models-and-computer-use) APIs were, and the default project they provided felt too heavyweight. This is a simple Electron app that lets Claude 3.5 Sonnet control your local computer directly. I was planning on adding a "semi-auto" mode where the user has to confirm each action before it executes, but each step is so slow I found that wasn't necessary and if the model is getting confused you can easily just hit the "stop" button to end the run.

### Getting started

1.  `git clone https://github.com/AgentBroge/agent.broge`
2.  `cd agent.broge`
3.  `npm install`
4.  Rename `.env.example` --> `.env` and add your Anthropic API Key
5.  `npm start`
6.  Prompt the model to do something interesting on your computer!

### Supported systems

- MacOS
- Theoretically Windows and Linux since all the deps are cross-platform

### Known limitations

- Only works on the primary display
- Lets an AI completely take over your computer
- Oh jeez, probably lots of other stuff too

### Tips

- Claude _really_ likes Firefox. It will use other browsers if it absolutely has to, but will behave so much better if you just install Firefox and let it go to its happy place.
