/**
 * LinearSplitProviderTests.ts
 */

export class MockWindowSplit {
    public get id(): string {
        return this._id
    }

    public get innerSplit(): any {
        return null
    }

    constructor(private _id: string = "mock.window") {}

    public render(): JSX.Element {
        return null
    }
}
