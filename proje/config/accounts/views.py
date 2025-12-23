from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model

# Sistemin kullandığı User modelini otomatik bulur
User = get_user_model()

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            # 1. React'ten gelen veriyi okuyoruz
            data = json.loads(request.body)
            
            # React tarafında gönderdiğin isimler neyse (email, password, fullName) buraya gelir
            email = data.get('email')
            password = data.get('password')
            full_name = data.get('fullName', '').strip() # Ad Soyad bitişik geliyor

            # --- KONTROLLER ---
            if not email or not password:
                return JsonResponse({'success': False, 'errors': {'hata': 'Email ve Şifre zorunludur.'}}, status=400)
            
            # Bu email daha önce alınmış mı?
            if User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'errors': {'email': 'Bu email adresi zaten kayıtlı.'}}, status=400)

            # --- İSİM AYIRMA VE HATAYI ENGELLEME ---
            # Backend "last_name" zorunlu dediği için burada ayırıyoruz
            if " " in full_name:
                # İlk boşluktan ikiye böl: "Ahmet Yılmaz" -> "Ahmet", "Yılmaz"
                first_name, last_name = full_name.split(" ", 1)
            else:
                # Sadece "Ahmet" girdiyse
                first_name = full_name
                last_name = "." # Boş bırakırsak hata verir, nokta koyuyoruz :)

            # --- KAYIT İŞLEMİ (Formsuz, Temiz) ---
            user = User.objects.create_user(
                username=email,  # Kullanıcı adı niyetine emaili kullanıyoruz
                email=email,
                password=password, # Tek şifre yeterli, password1/2 derdi yok
                first_name=first_name,
                last_name=last_name
            )
            
            return JsonResponse({'success': True, 'message': 'Kullanıcı başarıyla oluşturuldu'})

        except Exception as e:
            # Beklenmedik bir hata olursa React'e bildir
            return JsonResponse({'success': False, 'errors': {'sunucu': str(e)}}, status=400)

    return JsonResponse({'error': 'Sadece POST isteği atılabilir'}, status=405)