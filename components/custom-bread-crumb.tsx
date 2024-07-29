import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface CustomLink {
    params: {
        link: string;
    };
}

const CustomBreadCrumb = ({ params: { link } }: CustomLink) => {
    // Split the link by '/' and filter out any empty segments
    const segments = link.split('/').filter(Boolean);
    
    // Build the breadcrumb items
    const breadcrumbItems = segments.map((segment, index) => {
        // Create a path for each breadcrumb item
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        return { label: segment, href: path };
    });

    return (
        <div className="ml-16 mt-8 ">
            <Breadcrumb>
                <BreadcrumbList className="text-lg">
                <BreadcrumbSeparator/>
                    {breadcrumbItems.map((item, index) => (
                       <> 
                        <BreadcrumbItem key={index} >
                            <a href={item.href} className="text-blue-500 hover:underline  ">
                                {item.label}
                            </a>
                            {index>3&&index < breadcrumbItems.length - 1 && <BreadcrumbEllipsis />}
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length-1 &&<BreadcrumbSeparator />}
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default CustomBreadCrumb;
