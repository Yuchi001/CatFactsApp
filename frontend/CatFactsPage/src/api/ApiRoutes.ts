export class ApiRoutes {
    // cat facts
    static facts = (factLength?: number, maxListSize?: number) => {
        let url = "api/CatFact/list";
        const args = [];
        if (factLength) args.push(`factLength=${factLength}`);
        if (maxListSize) args.push(`maxSizeList=${maxListSize}`);
        args.forEach((a, index) => {
            url += index === 0 ? "?" : "&";
            url += a;
        });
        return url;
    };
    static fact = (factLength?: number) =>
        `api/CatFact${factLength ? `?factLength=${factLength}` : ""}`;
}
