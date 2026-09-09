# Teknik Mimari

## Başlangıç yığını

- Expo SDK 57
- React Native 0.86
- React 19
- TypeScript 6
- Android, iOS ve tablet için tek kod tabanı

## Mimari karar

MVP önce cihaz üzerinde ve hesap gerektirmeden çalışır. Bu tercih pilotu hızlandırır ve çocuklara ait verilerin gereksiz yere sunucuya taşınmasını engeller. Bulut hesabı ve sunucu, öğretmen/ebeveyn senkronizasyon ihtiyacı pilotta doğrulanırsa eklenir.

## Planlanan modüller

- `content`: metinler, kelime grupları ve sorular
- `exercises`: dört egzersiz motoru
- `sessions`: çalışma oturumu ve sonuçlar
- `progress`: hız ve anlama verilerinin birlikte yorumlanması
- `parent`: ebeveyn kapısı ve ilerleme özeti
- `settings`: yazı boyutu, kontrast, tempo ve erişilebilirlik

## Veri minimizasyonu

- Tam ad yerine rumuz
- Konum, rehber ve reklam kimliği yok
- MVP'de mikrofon/kamera izni yok
- Varsayılan olarak yerel saklama
- Kullanıcı tarafından veriyi silme

## Kalite kapıları

- TypeScript derleme kontrolü
- Egzersiz kuralları için birim testleri
- Küçük telefon ve yatay/dikey tablet kontrolü
- Dokunma hedefleri ve ekran okuyucu etiketleri
- Öğretmen tarafından pedagojik içerik incelemesi
