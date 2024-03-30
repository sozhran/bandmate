## Bandmate

#### Backstory
I like to play guitar, and try to practice when I can. Playing along to a monotonous click can be quite boring, and I like to program an interesting beat myself and play along to it. I've used quite a few apps for this purpose, from Guitar Pro and Logic to dedicated drum machine apps, both desktop and mobile. I've found a couple I like and use, but I couldn't find the one that would have all features I like, so...

I decided to build my own. I thought it'd be a nice challenge:

I have no idea how to do it - ✅

I'm personally invested and want to use the app - ✅

I have experience with similar apps, and rather than just replicate them, I actually have new ideas I want to try - ✅


This project is a result.

#### What's inside

Bandmate is a Node.js application written in TypeScript.
I use [Tone.js](https://tonejs.github.io/) as a sampler, and to ensure perfect timing during playback.
[Webpack](https://webpack.js.org/) is used as a loader for sound samples.
Currently everything lives on the front-end alone, but that's going to change.

#### What Bandmate can do

Right now Bandmate has all basic functionality of a drum machine: it has an extensive drumkit, allows to program and play beats in different time signatures and various tempos. In addition, it also can remember up to 8 patterns (using local storage), and has 3 levels of dynamics for every kit element (using 3 different samples per element to achieve it).

#### Roadmap

Many other features are planned, and some are currently in work.

- Accenter - a feature that adds a 'crash' sample to the 1st step of the pattern every N repeats (while removing other cymbals on this step from the sequence).
- Filler - similarly, a feature that adds a short fill in the end of the pattern every N repeats (replacing the original notes with itself).
These features will make the beat less rigid and really bring it alive. In most apps, you will need to create separate beats to achieve this, so possibility to create variation around one pattern will be one of Bandmate's original features.

- Sequencer - a second (separate) map where user can lay out a sequence of patterns and play them as a composition. Inspired by FL Studio.
- Add auth (and back end!) so users can register and save their own beats.
- Add a collection of pre-programmed beats from well-known songs.
- Divide notes into duplets and triplets.
- Add more kits.
- Create a mobile app.

#### Challenges

It took a while to get Tone.js to work and understand how different components come together.
