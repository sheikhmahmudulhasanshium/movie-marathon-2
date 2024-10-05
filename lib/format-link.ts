const FormatLink = (id: string | number, name: string, Variant: string, source?: string) => {
    let linkVariant: string | undefined;

    switch (Variant) {
        case "Keyword":
            linkVariant = "keyword";
            break;
        case "Genre":
            linkVariant = "genres";
            break;
        case "Company":
            linkVariant = "companies";
            break;
        case "Movie":
            linkVariant = "movies";
            break;
        case "Series":
            linkVariant = "tv-shows";
            break;
        case "Person":
            linkVariant = "persons";
            break;
        case "Country":
            linkVariant = "country";
            break;
        case "All":
            switch (source) {
                case "Keyword":
                    linkVariant = "keyword";
                    break;
                case "Genre":
                    linkVariant = "genres";
                    break;
                case "Company":
                    linkVariant = "companies";
                    break;
                case "Movie":
                    linkVariant = "movies";
                    break;
                case "Series":
                    linkVariant = "tv-shows";
                    break;
                case "Person":
                    linkVariant = "persons";
                    break;
                case "Country":
                    linkVariant = "country";
                        break;            
            }

        default:
            //console.log('Unknown variant: ',Variant)

            throw new Error(`Unknown variant: ${Variant}`);
    }
    const formattedName = name.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/(^-|-$)+/g, '');
    const link = Variant==="Country"?`/${linkVariant}/${id}`:`/${linkVariant}/${id}-${formattedName}`;
    
    return link;
};

export default FormatLink;
