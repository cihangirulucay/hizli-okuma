# HızlıOkuma

HızlıOkuma, 2. sınıf öğrencilerinin okuma akıcılığını geliştirirken okuduğunu anlama başarısını korumayı hedefleyen, kısa ve reklamsız günlük çalışmalar sunan mobil eğitim uygulamasıdır.

> Proje şu anda ürün tanımı ve tasarım doğrulama aşamasındadır. Uygulama kodu henüz repoya eklenmemiştir.

## Hedef

Çocukların yalnızca daha hızlı değil, anlayarak ve düzenli biçimde okumasını desteklemek.

Başarı değerlendirmesi tek başına okuma hızına dayanmaz. Okuma ritmi, kelime tanıma, tamamlama başarısı ve okuduğunu anlama birlikte ele alınır.

## MVP kapsamı

İlk sürüm 2. sınıf seviyesine odaklanır ve şu dört temel çalışmayı içerir:

1. **Metronomlu okuma** — Dengeli okuma ritmi oluşturma
2. **Kaybolan kelime ve kelime grupları** — Görsel tanıma ve kısa süreli hatırlama
3. **Kelime tamamlama** — Eksik harf, hece veya kelimeyi tamamlama
4. **Okuduğunu anlama** — Kısa metinlerin ardından 2–3 yaşa uygun soru

Günlük çalışma süresi yaklaşık 10–15 dakika olarak tasarlanacaktır.

## Kullanıcılar

- **Çocuk:** Günlük egzersizleri tamamlar.
- **Ebeveyn:** İlerleme özetini görür ve gerekli izinleri yönetir.
- **Öğretmen:** İçeriklerin 2. sınıf seviyesine ve pedagojik hedeflere uygunluğunu değerlendirir.

## MVP dışında kalanlar

İlk sürümde aşağıdaki özellikler yer almayacaktır:

- Mikrofonla sesli okuma analizi
- Reklam
- Ödeme ve abonelik
- Sosyal özellikler ve öğrenci sıralamaları
- Tıbbi tanı veya tedavi iddiaları
- Karmaşık yapay zekâ değerlendirmeleri
- Öğretmen sınıf yönetim paneli

Uygulama disleksi veya göz tembelliği için tanı ya da tedavi aracı değildir.

## Planlanan teknoloji

- Expo
- React Native
- TypeScript
- Android ve iOS için ortak kod tabanı
- Telefon ve tablet desteği
- MVP'de hesap gerektirmeyen, cihaz üzerinde çalışan yapı

Teknoloji kararlarının ayrıntıları için [teknik mimari belgesine](docs/ARCHITECTURE.md) bakın.

## Belgeler

- [Ürün çerçevesi](docs/PRODUCT.md)
- [MVP yol haritası](docs/ROADMAP.md)
- [Teknik mimari](docs/ARCHITECTURE.md)
- [Ekran tasarım özeti](docs/design/screen-overview.png)

## Geliştirme sırası

1. İçerik ve tasarım kurallarının tamamlanması
2. Expo + React Native proje iskeletinin eklenmesi
3. Metronomlu okuma motoru
4. Kaybolan kelime ve kelime grupları
5. Kelime tamamlama
6. Okuduğunu anlama akışı
7. Yerel ilerleme kaydı
8. Ebeveyn özeti
9. Öğretmen ve veli onaylı sınırlı pilot

## Ürün ilkeleri

- Hız, anlama başarısından ayrı değerlendirilmez.
- Çocuk ekranında reklam veya satın alma çağrısı bulunmaz.
- Yanlış cevap cezalandırılmaz; tekrar ve uygun seviyeye dönüş sağlanır.
- Gereksiz çocuk verisi toplanmaz.
- Tam ad yerine rumuz kullanılabilir.
- Mikrofon, kamera, konum ve reklam kimliği MVP'de kullanılmaz.
- İçerikler öğretmen kontrolünden geçirilir.
- Çalışmalar çocuğu ekranda daha uzun tutmaya değil, kısa ve nitelikli pratiğe yönlendirir.

## Mevcut durum

- [x] Ürün çerçevesi
- [x] MVP yol haritası
- [x] Teknik mimari kararı
- [x] İlk ekran tasarım özeti
- [ ] Tasarım sistemi ve düzenlenebilir ekran kaynakları
- [ ] 2. sınıf içerik rehberi
- [ ] Uygulama proje iskeleti
- [ ] İlk çalışan egzersiz

## Lisans

Bu depo şu anda özel geliştirme aşamasındadır. Açık kaynak lisansı henüz belirlenmemiştir.
