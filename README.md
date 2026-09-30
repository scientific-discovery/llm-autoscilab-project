# LLM-AutoSciLab: Closed-Loop Scientific Discovery via Active Experimentation with LLMs (NeurIPS 2026)

## About

LLM-AutoSciLab treats scientific discovery as active, hypothesis-conditioned experiment design. LLMs propose a set of competing mechanisms, experiments are placed where those mechanisms disagree most, and every result is used to refine, confirm, or falsify them. The paper also introduces ActiveSciBench, a benchmark suite for budget-limited, closed-loop discovery.

## Key Features

- **Decoupled hypothesis generation:** a small LLM samples diverse mechanism families; a larger LLM turns them into a primary hypothesis, alternatives, and diagnostic search regions
- **Hypothesis-conditioned acquisition:** experiments maximize disagreement between competing mechanisms, then switch to refinement once a mechanism is stable
- **Bootstrap confidence feedback:** refits on resampled data separate stable mechanisms from brittle ones and write the verdict to memory
- **ActiveSciBench:** ActiveSciBench-Chem (57 enzyme-kinetics tasks) and ActiveSciBench-GRN (45 gene-regulatory-network tasks) with hidden relevant variables

## Results

- 67.6% symbolic accuracy on NewtonBench and 35.1% on ActiveSciBench-Chem
- 31.1% exact graph recovery on ActiveSciBench-GRN, versus 6.7% for the best baseline
- 2–5× more sample-efficient than the strongest competing baselines

## Links

- 📄 [Paper (arXiv)](https://arxiv.org/abs/2605.24043)
- 💻 [Code (GitHub)](https://github.com/scientific-discovery/LLM-AutoSciLab)

## Acknowledgments
Parts of this project page were adopted from the [Nerfies](https://nerfies.github.io/) page.

## Website License
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
