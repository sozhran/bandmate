## Bandmate

Bandmate is a drum machine made with React/TypeScript and uses the sampler from [Tone.js](https://tonejs.github.io/) to ensure perfect playback timing. [Webpack](https://webpack.js.org/) is used as a loader for sound samples.

### How to use

Program the beat by clicking on the cells of the beat map and use <b>PLAY / STOP</b> to play the beat, or turn it off. Clicking on a kit element's name plays its sound sample.

The rest of the interface is described in the table below:

<table>
  <tr>
    <td><b>4/4 / 3/4</b></td>
    <td>Changes gaps in the beat map so beats in different time signatures would be easier to type. Is purely cosmetic and does not affect playback.</td>
  </tr>
  <tr>
    <td><b>CLEAR</b></td>
    <td>Clears the beat map and resets it to default. There are also <b>X</b> buttons to the right of the kit element's names to clear lines for these kit elements separately.</td>
  </tr>
  <tr>
    <td><b>1 / 2 / 3</b></td>
    <td>Changes the dynamics of notes you will be typing. [2]-notes are typed by default. [1]-notes are quieter, [3]-notes are louder.</td>
  </tr>
  <tr>
    <td><b>BPM</b></td>
    <td>Changes the tempo in the range 30-300.</td>
  </tr>
  <tr>
    <td><b>Steps</b></td>
    <td>Changes the number of steps on the beat map (and the time signature as a result).</td>
  </tr>
  <tr>
    <td><b>Save (1-8)</b></td>
    <td>Saves preset to your browser's local storage. Use Load buttons to load these presets back in Bandmate. There is also a hidden button that purges all presets from local storage.</td>
  </tr>
  <tr>
    <td><b>Add accent</b></td>
    <td>Adds a crash cymbal at the start of the first loop, and repeats every 2, 4, or 8 loops.</td>
  </tr>
  <tr>
    <td><b>Add fill</b></td>
    <td>Adds a fill at the end of every 2nd, 4th, or 8th loop by replacing the last 3 steps with 3 snare hits.</td>
  </tr>
</table>

#### Roadmap

Some features are already in work, others may happen in the future:

- Saving presets as files
- Uploading preset files
- Sequencer - a second (separate) map where user can lay out a sequence of patterns and play them as a composition. Inspired by FL Studio.
- Add auth (and back end!) so users can register and save their own beats.
- Divide notes into duplets and triplets.
- Add more kits.
- Create a mobile app.
