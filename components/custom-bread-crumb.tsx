import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface CustomLink {
    params: {
        link: string;
        name: string;
    };
}

const CustomBreadCrumb = ({ params: { link, name } }: CustomLink) => {
    // Split the link by '/' and filter out any empty segments
    const linkSegments = link.split('/').filter(Boolean);
    
    // Assuming the name is a single string representing the movie or TV show name
    // If it’s not a simple string but rather needs to be split, adjust accordingly
    const nameSegments = name.split('/').filter(Boolean);

    // Build the breadcrumb items using both link and name segments
    const breadcrumbItems = linkSegments.map((segment, index) => {
        // Create a path for each breadcrumb item
        const path = `/${linkSegments.slice(0, index + 1).join('/')}`;
        
        // Get the corresponding name segment, defaulting to the link segment if not available
        const label = nameSegments[index] || segment;

        return { label, href: path };
    });

    return (
        <div className="ml-16 mt-8 ">
            <Breadcrumb>
                <BreadcrumbList className="text-lg">
                    {breadcrumbItems.map((item, index) => (
                        <div key={index} className="inline-flex items-center">
                            <BreadcrumbItem>
                                <a href={item.href} className="text-blue-500 hover:underline">
                                    {item.label}
                                </a>
                            </BreadcrumbItem>
                            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                            {index > 3 && index < breadcrumbItems.length - 1 && <BreadcrumbEllipsis />}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default CustomBreadCrumb;
