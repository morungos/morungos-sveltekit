const imageModules = import.meta.glob(
    '$lib/assets/cards/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
    {
        eager: true,
        query: {
            enhanced: true,
        },
        import: 'default',
    }
) as Record<string, any>

function strip(file: string): string {
    const m = file.match(/^.*?\/([^\/]+)$/)
    if (m) {
        return m[1]
    } else {
        return file
    }
}

// Replaces the map with one keyed by the filename alone, and exports it
export const modules = Object.fromEntries(Object.entries(imageModules).map(([id, v]) => [strip(id), v]))
