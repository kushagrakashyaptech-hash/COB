from datetime import datetime


def calculate_company_age(founded_year: int) -> int:
    current_year = datetime.now().year
    return current_year - founded_year


def calculate_investment_cap(company_age: int) -> int:
    if company_age < 1:
        return 20000
    elif company_age <= 3:
        return 100000
    elif company_age <= 7:
        return 300000
    else:
        return 1000000


def validate_campaign_budget(founded_year: int, campaign_budget: float) -> str:
    company_age = calculate_company_age(founded_year)
    investment_cap = calculate_investment_cap(company_age)

    if campaign_budget <= investment_cap:
        return "approved"
    else:
        return "needs_sales_verification"


def classify_campaign_scale(campaign_capacity: int) -> str:
    if campaign_capacity < 500:
        return "small"
    elif campaign_capacity < 5000:
        return "medium"
    else:
        return "large"


def calculate_marketing_ratio(campaign_budget: float, annual_sales: float) -> float:
    if annual_sales == 0:
        return 0
    return campaign_budget / annual_sales


def validate_marketing_ratio(marketing_ratio: float) -> str:
    if marketing_ratio < 0.30:
        return "approved"
    elif marketing_ratio < 0.50:
        return "warning"
    else:
        return "rejected"