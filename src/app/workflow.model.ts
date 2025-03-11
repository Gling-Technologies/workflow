export interface workflowItem {
    key: string;
    name: string;
    next?: string;
}

export interface Workflow {
    name: string;
    vars: { [key: string]: any };
    entrypoint: string;
    steps: { [key: string]: Step };
    flows: { [key: string]: Flow };
}

export interface Step {
    name: string;
    next: string | null;
    action: Action;
}

export interface Flow {
    name: string;
    next: string | null;
    actions: Action[];
    vars?: { [key: string]: any };
}

export interface Action {
    type: string;
    kind: string;
    selector?: Selector;
    snippet?: string;
    fallback?: string;
    property?: string;
    scope?: string;
    var?: string;
    export?: Export;
    provider?: string;
    requires?: string;
    conditions?: Condition[];
    run?: string;
    dimensions?: Dimensions;
    url?: string;
    value?: any;
    attribute?: string;
    multiple?: boolean;
    operation?: string;
    time_period?: number;
    condition?: Condition;
}

export interface Selector {
    by: string;
    path: string;
}

export interface Export {
    scope: string;
    var: string;
    action: string;
}

export interface Condition {
    operator: string;
    operands: (string | number | null | boolean)[];
}

export interface Dimensions {
    width: number;
    height: number;
}
