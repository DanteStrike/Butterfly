export const initLiveReload = (isDevelopment = false) => {
    if (!isDevelopment) {
        return;
    }

    new EventSource('/esbuild').addEventListener('change', () => location.reload());

    console.log('DEVELOPMENT__MODE');
};
