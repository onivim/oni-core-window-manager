import { IAugmentedSplitInfo, SplitOrLeaf } from "./WindowManagerStore"

// TODO: Possible API types?
export type Direction = "up" | "down" | "left" | "right"
export type SplitDirection = "horizontal" | "vertical"

export const getInverseSplitDirection = (splitDirection: SplitDirection): SplitDirection => {
    switch (splitDirection) {
        case "horizontal":
            return "vertical"
        case "vertical":
        default:
            return "horizontal"
    }
}


export const getInverseDirection = (direction: Direction): Direction => {
    switch (direction) {
        case "up":
            return "down"
        case "down":
            return "up"
        case "left":
            return "right"
        case "right":
            return "left"
        default:
            return null
    }
}

/**
 * Interface for something that can navigate between window splits
 */
export interface IWindowSplitNavigator {
    contains(split: IAugmentedSplitInfo): boolean
    move(startSplit: IAugmentedSplitInfo, direction: Direction): IAugmentedSplitInfo
}

/**
 * Interface for something that can manage window splits:
 * - Navigating splits
 * - Creating a new split
 * - Removing a split
 * Later - resizing a split?
 */
export interface IWindowSplitProvider extends IWindowSplitNavigator {
    split(
        newSplit: IAugmentedSplitInfo,
        direction: SplitDirection,
        referenceSplit?: IAugmentedSplitInfo,
    ): boolean
    close(split: IAugmentedSplitInfo): boolean
    getState(): SplitOrLeaf<IAugmentedSplitInfo>
}

