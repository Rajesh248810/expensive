from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Create default categories for the new user
        default_categories = ['Food', 'Transport', 'Rent', 'Shopping', 'Salary', 'Investment']
        for cat_name in default_categories:
            Category.objects.create(name=cat_name, user=user)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('user',)

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    # Use the decrypted property for the API response
    description = serializers.CharField(source='decrypted_description', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('user',)

    def to_internal_value(self, data):
        # We need to map the incoming 'description' string back to the model field
        # The model's save() method will handle encryption.
        internal_value = super().to_internal_value(data)
        if 'decrypted_description' in internal_value:
            internal_value['description'] = internal_value.pop('decrypted_description')
        return internal_value
