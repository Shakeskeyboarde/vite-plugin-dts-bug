# Bug Repro for `vite-plugin-dts'

Bug: https://github.com/qmhc/vite-plugin-dts/issues/280

The `vite-plugin-dts` v3.6.1 release added a Vue fix which sets the `moduleResolution` option to `Node10` if it's not explicitly set in the `tsconfig.json` file. This overrides the default Typescript behavior of determining an implicit value based on the `module` option.

Due to this change, an implicitly typed export will not generate the correct type declaration file, which would should include an inlined `import("<id>").<type>` statement.

The bug still exists in v3.6.2.

## Steps to reproduce

1. Clone this repo
2. Run `npm install`
3. Run `npm test`

This will produce the `error TS7006: Parameter 'response' implicitly has an 'any' type.` error in the `a` package [src/index.ts](packages/a/src/index.ts) file at line 8.

If you check the emitted [lib/index.d.ts](packages/b/lib/index.d.ts) type declaration file in the `b` package, you will see that type of the exports `client` instance is `any`.

```ts
export declare const client: any;
```

It _should_ have a type which uses an inlined `import(...)` statement.

```ts
export declare const client: import("c").Client;
```

## Workaround

Uncomment the `moduleResolution` option in the [tsconfig.json](tsconfig.json) file. And rerun the repro steps. No error occurs because the emitted type declaration in the `b` package is now correct.

## Recommendation

I'm not sure why Vue requires the `moduleResolution` option to be explicitly set, but I think that the change should be reverted and the documentation updated to indicate that Vue users need to include the explicit option in their `tsconfig.json` file.

As it stands, _everyone else_ will need to include the explicit option, and Vue users _may_ get the result they need. Or, possibly the fix also causes unexpected loss of type information in Vue projects, which simply has been overlooked so far.