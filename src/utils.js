export function isAuthPage() {
    const authPath = /\/auth/;
    return authPath.test(window.location.href);
}
