import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_messy_data(rows=100):
    """
    This script generates 'Dirty Data' to test our Data Strategy.
    It intentionally creates errors to prove our Auditor works.
    """
    base_date = datetime(2026, 1, 1)
    
    data = {
        'order_id': range(1001, 1001 + rows),
        'customer_id': [f"CUST-{np.random.randint(100, 200)}" for _ in range(rows)],
        'order_date': [base_date + timedelta(days=x) for x in range(rows)],
        
        # STRATEGIC ERROR 1: Logic Violation
        # Some 'ship_dates' will happen BEFORE the 'order_date'. 
        # An AI would get confused by this "time travel."
        'ship_date': [base_date + timedelta(days=x + np.random.randint(-5, 10)) for x in range(rows)],
        
        # STRATEGIC ERROR 2: Missing Data (Nulls)
        # AI models hate empty cells. We're leaving 10% of these blank.
        'order_value': [np.random.uniform(10, 500) if np.random.random() > 0.1 else np.nan for _ in range(rows)],
        
        # STRATEGIC ERROR 3: Stale Data
        # We're setting the 'last_updated' to 2025. 
        # This proves our Strategy can detect "old" data that shouldn't be used for AI.
        'last_updated': [datetime(2025, 12, 1) for _ in range(rows)] 
    }
    
    df = pd.DataFrame(data)
    
    # STRATEGIC ERROR 4: Duplicates
    # We're adding 5 duplicate rows to test 'Accountability' and 'Ownership'.
    df = pd.concat([df, df.iloc[:5]], ignore_index=True)
    
    # Save the file
    df.to_csv('raw_enterprise_data.csv', index=False)
    print("✅ Created 'raw_enterprise_data.csv' with intentional strategic flaws.")

if __name__ == "__main__":
    generate_messy_data()
