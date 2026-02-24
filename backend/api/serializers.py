from rest_framework import serializers
from .models import Category, Transaction
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Create default categories for new user
        default_categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Salary', 'Other']
        for cat in default_categories:
            Category.objects.create(name=cat, user=user)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'user']
        read_only_fields = ['user']

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'type', 'category', 'category_name', 'description', 'date', 'created_at']
        read_only_fields = ['user', 'created_at', 'category_name']
