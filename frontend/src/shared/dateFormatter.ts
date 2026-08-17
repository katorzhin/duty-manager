export const formatDateTime = (date: string) => {

    return new Intl.DateTimeFormat("uk-UA",  {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};