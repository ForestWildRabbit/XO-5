import {create} from 'zustand';

export enum Theme{
    dark = 'dark',
    light = 'light'
}

type ThemeStore = {
    theme: Theme,
    updateTheme: (new_theme: Theme) => void,
}

export const useThemeStore = create<ThemeStore>()(set => ({
    theme: Theme.dark,
    updateTheme: (new_theme: Theme) => set(() => {
        localStorage.setItem('theme', new_theme);
        return {theme: new_theme};
    })
}))