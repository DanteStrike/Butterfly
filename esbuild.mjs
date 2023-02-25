import esbuild from 'esbuild';
import chokidar from 'chokidar';
import autoprefixer from 'autoprefixer';
import stylePlugin from 'esbuild-style-plugin';

const isDevelopment = process.env.MODE === 'development';

const watchDirectories = ['./src/**/*.ts', './src/**/*.scss', './dist/index.html'];

const baseBuildConfig = {
    logLevel: 'info',
    bundle: true,
    plugins: [
        stylePlugin({
            postcss: {
                plugins: [autoprefixer],
            },
        }),
    ],
    entryPoints: ['./src/index.ts'],
    outfile: './dist/assets/bundle.js',
    minify: true,
    tsconfig: 'tsconfig.eslint.json',
    target: 'es6',
};

const builder = async () => {
    if (isDevelopment) {
        const ctx = await esbuild.context({
            ...baseBuildConfig,
            sourcemap: 'both',
            define: { __IS_DEVELOPMENT__: JSON.stringify(isDevelopment) },
        });

        await ctx.serve({
            servedir: 'dist',
        });

        chokidar.watch(watchDirectories).on('all', (event, path) => {
            console.log(`rebuilding ${path}`);

            ctx.rebuild();
        });
    } else {
        await esbuild.build({
            ...baseBuildConfig,
        });
    }
};

builder()
    .then(() => console.log('builder success'))
    .catch((reason) => console.log('builder error: ', reason));
