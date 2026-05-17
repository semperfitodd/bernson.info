resource "aws_budgets_budget" "monthly_budget" {
  name         = "monthly-budget"
  budget_type  = "COST"
  limit_amount = var.budget_limit_usd
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  cost_types {
    include_upfront = false
  }

  tags = var.tags
}
