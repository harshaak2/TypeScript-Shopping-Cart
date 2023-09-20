const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {currency: "USD", style: "currency"})

export function formatCurrency(n: number){
    return CURRENCY_FORMATTER.format(n)
}
