## Bandmate

Bandmate is a drum machine made with React/TypeScript and uses the sampler from [Tone.js](https://tonejs.github.io/) to ensure perfect playback timing. [Webpack](https://webpack.js.org/) is used as a loader for sound samples.

### How to use

<table>
  <tr>
    <td>PLAY / STOP</td>
    <td>Turns playback on and off.</td>
  </tr>
  <tr>
    <td>4/4 / 3/4</td>
    <td>Changes gaps in the grid so beats in different time signatures would be easier to type. Is purely cosmetic and does not affect playback.</td>
  </tr>
  <tr>
    <td>CLEAR</td>
    <td>Clears the grid and resets it to default. There are also <b>X</b> buttons along the grid to clear lines for every kit element separately.</td>
  </tr>
  <tr>
    <td>1 / 2 / 3</td>
    <td>Changes the dynamics of notes you will be typing. [1]-notes are quieter, [3]-notes are louder.</td>
  </tr>
  <tr>
    <td>BPM</td>
    <td>Changes the tempo in the range 30-300.</td>
  </tr>
  <tr>
    <td>Steps</td>
    <td>Changes the number of beats on the grid (and the time signature as a result).</td>
  </tr>
  <tr>
    <td>Save (1-8)</td>
    <td>Saves preset to your browser's local storage. Use Load buttons to load these presets back in Bandmate. There is also a hidden button that purges all presets from local storage.</td>
  </tr>
  <tr>
    <td>Add accent</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>Add fill</td>
  </tr>
</table>

#### Roadmap

Many other features are planned, and some are currently in work.

~~- Accenter - a feature that adds a 'crash' sample to the 1st step of the pattern every N repeats (while removing other cymbals on this step from the sequence).~~
~~- Filler - similarly, a feature that adds a short fill in the end of the pattern every N repeats (replacing the original notes with itself).~~
~~- Add a collection of pre-programmed beats from well-known songs.~~

- Saving presets as files
- Uploading preset files
- Sequencer - a second (separate) map where user can lay out a sequence of patterns and play them as a composition. Inspired by FL Studio.
- Add auth (and back end!) so users can register and save their own beats.
- Divide notes into duplets and triplets.
- Add more kits.
- Create a mobile app.
