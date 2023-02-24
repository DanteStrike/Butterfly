import esbuild from 'esbuild';
import autoprefixer from 'autoprefixer';
import stylePlugin from 'esbuild-style-plugin';

const isDevelopment = process.env.MODE === 'development';

const baseBuildConfig = {
    logLevel: 'info',
    bundle: true,
    plugins: [
        stylePlugin({
            postcss: {
                plugins: [autoprefixer]
            }
        }),
    ],
    entryPoints: ['./src/index.ts'],
    outfile: './dist/assets/bundle.js',
    minify: true,
    tsconfig: 'tsconfig.eslint.json',
    target: 'es6',
}

if (isDevelopment) {
    const ctx = await esbuild.context({
        ...baseBuildConfig,
        sourcemap: 'both',
    });

    await ctx.watch();
    await ctx.serve({
        servedir: 'dist',
    });
} else {
    await esbuild.build({
        ...baseBuildConfig,
    });
}
