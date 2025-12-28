from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# SignUp Form
class CustomUserCreationForm(forms.ModelForm):
    password1 = forms.CharField(
        label='Password', 
        widget=forms.PasswordInput,
        error_messages={'required': 'Parola zorunludur'}
    )
    password2 = forms.CharField(
        label='Password confirmation', 
        widget=forms.PasswordInput,
        error_messages={'required': 'Parolayı tekrar giriniz'}
    )
    first_name = forms.CharField(
        label='İsim',
        error_messages={'required': 'İsim alanı boş bırakılamaz'}
    )
    last_name = forms.CharField(
        label='Soyisim',
        error_messages={'required': 'Soyisim alanı boş bırakılamaz'}
    )
    email = forms.EmailField(
        label='Email',
        error_messages={'required': 'Email alanı boş bırakılamaz'}
    )

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')  # username yok

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Parolalar eşleşmiyor")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = self.cleaned_data['email']
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

# Login Form
class EmailLoginForm(forms.Form):
    email = forms.EmailField(label="Email")
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        password = cleaned_data.get('password')

        if email and password:
            user = User.objects.filter(email=email).first()
            if not user or not authenticate(username=user.username, password=password):
                raise forms.ValidationError("Email veya şifre yanlış")            
            cleaned_data['user'] = user

        return cleaned_data

