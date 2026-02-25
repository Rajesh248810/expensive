from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from cryptography.fernet import Fernet
import os

class Category(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('INCOME', 'Income'),
        ('EXPENSE', 'Expense')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(blank=True, null=True) # This will store encrypted text
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} - {self.amount} on {self.date}"

    def save(self, *args, **kwargs):
        # Encrypt description before saving
        if self.description:
            key = os.getenv('ENCRYPTION_KEY')
            if key:
                f = Fernet(key.encode())
                # Only encrypt if not already encrypted (simple check for Fernet header)
                if not self.description.startswith('gAAAA'):
                    self.description = f.encrypt(self.description.encode()).decode()
        super().save(*args, **kwargs)

    @property
    def decrypted_description(self):
        if not self.description:
            return ""
        try:
            key = os.getenv('ENCRYPTION_KEY')
            if not key:
                return self.description
            f = Fernet(key.encode())
            return f.decrypt(self.description.encode()).decode()
        except Exception:
            # If decryption fails, return as is (might not be encrypted yet)
            return self.description
