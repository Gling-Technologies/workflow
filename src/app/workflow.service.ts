import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  categories: { [key: string]: string[] } = {
    "Control Operators": ["condition", "for_each", "run_until", "scope", "switch", "terminate"], 
    "Variables Operators": ["append_to_array", "append_to_string", "merge_array", "decrement", "increment","initializer", "set_var", "filter", "deduplicate"], 
    "Web Operators": ["existence", "click", "write", "select", "hover", "extract_data", "css_property", "visibility", "snippet", "wait_until"], 
    "Browser Operators": ["window_resize", "load", "refresh_tab", "wait_for_download"], 
    "System Operators": ["wait", "run", "delete_file", "move_file"]
  };

  getCategories(): { [key: string]: string[] } {
    return this.categories;
  }

  getCategoryByOperator(operator: string): string {
    for (const category in this.categories) {
      if (this.categories[category].includes(operator)) {
        return category;
      }
    }
    return ''
  }

  // workflow = {
  //   "name": "",
  //   "vars": "",
  //   "entrypoint": "",
  //   "steps": {},
  //   "flow": {}
  // }

  workflow = {
    "name": "Customer Emails",
    "vars": {
      "customers": []
    },
    "entrypoint": "load_and_login",
    "steps": {
      "get_date_formula_from_snippet": {
        "name": "get_date_formula_from_snippet",
        "next": "wait_till_loading_finish_after_refresh",
        "action": {
          "type": "snippet",
          "kind": "web",
          "selector": {
            "by": "xpath",
            "path": ""
          },
          "snippet": "const start_date = new Date(now.getFullYear(), now.getMonth(), 1);\nreturn start_date.toLocaleDateString();\n",
          "export": {
            "scope": "global",
            "var": "month_start_date",
            "action": "set"
          }
        }
      },
      "sleep_for_five_seconds": {
        "name": "sleep",
        "next": "",
        "action": {
          "type": "wait",
          "kind": "system",
          "time_period": 5
        }
      },
      "wait_till_loading_finish_after_refresh": {
        "name": "wait till loading finish after refresh",
        "next": "goto_customers_panel",
        "action": {
          "type": "run",
          "kind": "system",
          "run": "wait_till_loading_finish"
        }
      },
      "goto_customers_panel": {
        "name": "goto_user_profile_screen",
        "next": "extract_all_customers",
        "action": {
          "type": "run",
          "kind": "system",
          "run": "switch_to_customers_panel"
        }
      },
      "send_email_for_each_customer": {
        "name": "Send email to each of the customer",
        "next": "logout",
        "action": {
          "type": "for_each",
          "kind": "control",
          "provider": "variable",
          "requires": "customers",
          "conditions": [],
          "run": "send_email"
        }
      }
    },
    "flows": {
      "load_and_login": {
        "name": "Load & Login",
        "next": "get_date_formula_from_snippet",
        "actions": [
          {
            "kind": "browser",
            "type": "window_resize",
            "dimensions": {
              "width": 1440,
              "height": 807
            }
          },
          {
            "kind": "browser",
            "type": "load",
            "url": "https://outlook.com"
          },
          {
            "kind": "web",
            "type": "write",
            "selector": {
              "by": "xpath",
              "path": "//input[@id=\"s_swepi_1\" or @name=\"SWEUserName\"]"
            },
            "provider": "identity",
            "requires": "username"
          },
          {
            "type": "write",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//input[@id=\"s_swepi_2\" or @name=\"SWEPassword\"]"
            },
            "provider": "identity",
            "requires": "password"
          },
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//a[@id=\"s_swepi_22\"]"
            }
          }
        ]
      },
      "wait_till_loading_finish": {
        "name": "Wait for loader to finish",
        "next": "",
        "actions": [
          {
            "type": "wait",
            "kind": "system",
            "time_period": 5
          },
          {
            "type": "set_var",
            "kind": "variable",
            "scope": "global",
            "var": "mask_overlay_display",
            "value": "block"
          },
          {
            "type": "run_until",
            "kind": "control",
            "conditions": [
              {
                "operator": "equals",
                "operands": [
                  "$mask_overlay_display",
                  "none"
                ]
              }
            ],
            "run": "get_set_maskoverlay_css_display_property"
          }
        ]
      },
      "get_set_maskoverlay_css_display_property": {
        "name": "Get and Set MaskOverlay element's `display` css property",
        "next": null,
        "actions": [
          {
            "type": "css_property",
            "kind": "web",
            "operation": "get",
            "property": "display",
            "selector": {
              "by": "xpath",
              "path": " //div[@id=\"maskoverlay\"] "
            },
            "export": {
              "scope": "global",
              "var": "mask_overlay_display",
              "action": "set"
            }
          },
          {
            "type": "wait",
            "kind": "system",
            "time_period": 5
          }
        ]
      },
      "switch_to_customers_panel": {
        "name": "Switch to customer's panel to each customer emails",
        "next": null,
        "actions": [
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": " //li[@name=\"SiteMap\" or @title=\"Site Map\"] "
            }
          },
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//table[@class=\"siebui-sitemap-index-section\"]  //a[text()=\"Customers\"]"
            }
          },
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//table[@class=\"siebui-sitemap-index-section\"]  //following-sibling::ul[@class=\"siebui-sitemap-main\"]  //a[text()=\"Customers\"]"
            }
          }
        ]
      },
      "extract_all_customers": {
        "name": "Extract all the customers",
        "vars": {},
        "next": "send_email_for_each_customer",
        "actions": [
          {
            "type": "set_var",
            "kind": "variable",
            "scope": "global",
            "var": "customers",
            "value": []
          },
          {
            "type": "extract_data",
            "kind": "web",
            "attribute": "className",
            "selector": {
              "by": "xpath",
              "path": " //div[contains(@id, \"pager\")\nand @class=\"ui-pager-control\"] //td //span[@title=\"Next record set\"]"
            },
            "export": {
              "scope": "global",
              "var": "next_page_button_class",
              "action": "set"
            }
          },
          {
            "type": "run_until",
            "kind": "control",
            "conditions": [
              {
                "operator": "contains",
                "operands": [
                  "ui-state-disabled",
                  "$next_page_button_class"
                ]
              }
            ],
            "run": "extract_customers"
          },
          {
            "type": "filter",
            "kind": "variable",
            "scope": "global",
            "var": "customers",
            "value": "glingtech.com",
            "condition": {
              "operator": "endsWith",
              "operands": [
                null,
                "glingtech.com"
              ]
            }
          },
          {
            "type": "deduplicate",
            "kind": "variable",
            "scope": "global",
            "var": "customers",
            "value": null
          }
        ]
      },
      "extract_customers": {
        "name": "Extract customers",
        "next": "",
        "actions": [
          {
            "type": "wait",
            "kind": "system",
            "time_period": 5
          },
          {
            "type": "extract_data",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//table[@summary=\"Customer\"] //tr[contains(@class, \"ui-customer\")] //td[4]"
            },
            "attribute": "innerText",
            "multiple": true,
            "export": {
              "scope": "global",
              "var": "roles",
              "action": "extend"
            }
          },
          {
            "type": "extract_data",
            "kind": "web",
            "attribute": "className",
            "selector": {
              "by": "xpath",
              "path": " //div[contains(@id, \"pager\")\nand @class=\"ui-pager-control\"] //td //span[@title=\"Next record set\"]\n//.."
            },
            "export": {
              "scope": "global",
              "var": "next_page_button_class",
              "action": "set"
            }
          },
          {
            "type": "condition",
            "kind": "control",
            "conditions": [
              {
                "operator": "notContains",
                "operands": [
                  "ui-state-disabled",
                  "$next_page_button_class"
                ]
              }
            ],
            "run": "click_next_record_set_btn",
            "fallback": ""
          }
        ]
      },
      "send_email": {
        "name": "Send email to the customer",
        "next": null,
        "actions": [
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//div[text()=\"New Email\"]"
            }
          },
          {
            "type": "write",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//div[@name=\"popup\"] //div[text()=\"Subject\"]"
            }
          },
          {
            "type": "write",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//div[@name=\"popup\"] //div[text()=\"Body\"]"
            }
          },
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//div[@name=\"popup\"] //button[text()=\"Send\"]"
            }
          }
        ]
      },
      "logout": {
        "name": "Logout",
        "next": "",
        "actions": [
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//li[@title=\"Settings\" or name=\"Root\"]"
            }
          },
          {
            "type": "click",
            "kind": "web",
            "selector": {
              "by": "xpath",
              "path": "//button[text()=\"Logout\"]"
            }
          }
        ]
      }
    }
  }

  getName(type: 'steps' | 'flows'): string[]{
    return Object.values(this.workflow[type]).map((item: any) => item.name);
  }

  getNext(type: 'steps' | 'flows'){
    return Object.values(this.workflow[type]).map((item: any) => item.next).filter((next) => next !== "");
  }

  getKey(type: 'steps' | 'flows'){
    return Object.keys(this.workflow[type]);
  }

  getKeyAndNext(type: 'steps' | 'flows') {
    return Object.entries(this.workflow[type])
      .filter(([_, item]: [string, any]) => item.name) 
      .map(([key, item]) => ({
        name: item.name,
        key,
        next: item.next || '',
    }));
  }

  getFormatted(operator: string): string {
    return operator ? operator.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  }
}