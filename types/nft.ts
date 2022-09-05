export type Traits = "attack" | "health" | "speed"

export type NftAttributes = {
    trait_type: Traits,
    value: string
}

export type NftMeta = {
    name: string,
    description: string,
    image: string,
    attributes: NftAttributes[]
}