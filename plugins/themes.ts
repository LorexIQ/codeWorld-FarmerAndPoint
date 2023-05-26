import {defineNuxtPlugin, ref, useDark} from "#imports";

export default defineNuxtPlugin(nuxtApp => {
    const isDarkMode = useDark();

    const ThemeName = [
        'dark-mode',
        'light-mode'
    ] as const;
    type ThemeName = typeof ThemeName[number];
    let selectedThemeMode = ref<ThemeName>(getState());

    function saveState(): void {
        localStorage.setItem('theme', selectedThemeMode.value);
    }
    function getState(): ThemeName {
        const theme = localStorage.getItem('theme') as ThemeName;
        return theme ?? isDarkMode.value;
    }
    function setTheme(theme: ThemeName): void {
        selectedThemeMode.value = theme;
        saveState();
    }

    return {
        provide: {
            setTheme,
            selectedTheme: selectedThemeMode
        }
    };
})
