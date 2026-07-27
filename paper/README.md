# Formalization build and review

The archival source is
`RES_RAG_CSNP_Formalization_v1.0.0.tex`. The GitHub-readable edition is
`RES_RAG_CSNP_Formalization_v1.0.0.md`.

## Build

From this directory:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error \
  RES_RAG_CSNP_Formalization_v1.0.0.tex
```

The build requires a standard TeX Live installation with `latexmk`, `bibtex`,
and the packages declared in the preamble.

## Protocol checks

From the repository root:

```sh
node --test protocol/tests/verify_receipt.test.mjs
node protocol/tools/verify_receipt.mjs \
  protocol/examples/csnp-receipt.example.json
```

## Archival review

Before a DOI deposit:

1. both authors approve the manuscript and `CONTRIBUTIONS.md`;
2. affiliations, ORCIDs, author order, version, release date, and licenses are
   confirmed;
3. the PDF is rebuilt from the tagged source;
4. the receipt example and tamper tests pass at the tag;
5. repository and archival checksums are recorded; and
6. a DOI is added to `CITATION.cff` only after it resolves.

