
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, GraduationCap, Mail, Phone, Info, BookOpen, Award } from "lucide-react";

const TeacherProfile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Profil Guru">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                  {user?.name ? user.name.charAt(0) : "G"}
                </div>
                <div>
                  <CardTitle className="text-2xl">{user?.name || "Guru"}</CardTitle>
                  <p className="text-muted-foreground">NIP: 198304152005012003</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium text-sm">
                  Aktif
                </div>
                <p className="text-muted-foreground text-sm">Wali Kelas 6A</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Informasi Umum</TabsTrigger>
                <TabsTrigger value="academic">Data Akademik</TabsTrigger>
                <TabsTrigger value="teaching">Mengajar</TabsTrigger>
                <TabsTrigger value="history">Riwayat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Informasi Pribadi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Nama Lengkap</dt>
                          <dd className="col-span-2">{user?.name || "Guru"}</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">NIP</dt>
                          <dd className="col-span-2">198304152005012003</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Status Kepegawaian</dt>
                          <dd className="col-span-2">PNS</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Jenis Kelamin</dt>
                          <dd className="col-span-2">Perempuan</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Tempat, Tgl Lahir</dt>
                          <dd className="col-span-2">Jakarta, 15 April 1983</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Kontak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Email</dt>
                          <dd className="col-span-2">guru@sekolah.sch.id</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">No. Telepon</dt>
                          <dd className="col-span-2">08123456789</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Alamat</dt>
                          <dd className="col-span-2">Jl. Pendidikan No. 45, Jakarta Selatan</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Kota</dt>
                          <dd className="col-span-2">Jakarta</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="academic" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        Pendidikan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Jenjang Pendidikan</dt>
                          <dd className="col-span-2">S1</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Perguruan Tinggi</dt>
                          <dd className="col-span-2">Universitas Pendidikan Indonesia</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Jurusan</dt>
                          <dd className="col-span-2">Pendidikan Guru Sekolah Dasar</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Tahun Lulus</dt>
                          <dd className="col-span-2">2004</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Sertifikasi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Status Sertifikasi</dt>
                          <dd className="col-span-2">Tersertifikasi</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Tahun Sertifikasi</dt>
                          <dd className="col-span-2">2010</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">Bidang Sertifikasi</dt>
                          <dd className="col-span-2">Guru Kelas SD</dd>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="font-medium">No. Sertifikasi</dt>
                          <dd className="col-span-2">12345/CERT/2010</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="teaching" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Data Mengajar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Mata Pelajaran</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center p-3 border rounded-md">
                            <div className="bg-blue-100 text-blue-700 p-2 rounded-full mr-3">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Matematika</p>
                              <p className="text-sm text-muted-foreground">Kelas 6A, 6B</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <div className="bg-green-100 text-green-700 p-2 rounded-full mr-3">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">IPA</p>
                              <p className="text-sm text-muted-foreground">Kelas 6A</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Jadwal Mengajar</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted">
                                <th className="px-4 py-2 text-left">Hari</th>
                                <th className="px-4 py-2 text-left">Jam</th>
                                <th className="px-4 py-2 text-left">Mata Pelajaran</th>
                                <th className="px-4 py-2 text-left">Kelas</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-4 py-2">Senin</td>
                                <td className="px-4 py-2">07:30 - 09:30</td>
                                <td className="px-4 py-2">Matematika</td>
                                <td className="px-4 py-2">6A</td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-4 py-2">Senin</td>
                                <td className="px-4 py-2">10:00 - 12:00</td>
                                <td className="px-4 py-2">Matematika</td>
                                <td className="px-4 py-2">6B</td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-4 py-2">Selasa</td>
                                <td className="px-4 py-2">07:30 - 09:30</td>
                                <td className="px-4 py-2">IPA</td>
                                <td className="px-4 py-2">6A</td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-4 py-2">Rabu</td>
                                <td className="px-4 py-2">07:30 - 09:30</td>
                                <td className="px-4 py-2">Matematika</td>
                                <td className="px-4 py-2">6A</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Riwayat Mengajar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="border-l-2 border-primary pl-4 pb-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">2022 - Sekarang</span>
                          <span className="font-medium">Wali Kelas 6A</span>
                          <span className="text-sm">SDN Contoh 1 Jakarta</span>
                        </div>
                      </li>
                      <li className="border-l-2 border-primary/70 pl-4 pb-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">2020 - 2022</span>
                          <span className="font-medium">Wali Kelas 5B</span>
                          <span className="text-sm">SDN Contoh 1 Jakarta</span>
                        </div>
                      </li>
                      <li className="border-l-2 border-primary/50 pl-4 pb-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">2018 - 2020</span>
                          <span className="font-medium">Wali Kelas 4A</span>
                          <span className="text-sm">SDN Contoh 1 Jakarta</span>
                        </div>
                      </li>
                      <li className="border-l-2 border-primary/30 pl-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">2015 - 2018</span>
                          <span className="font-medium">Guru Mata Pelajaran</span>
                          <span className="text-sm">SDN Contoh 2 Jakarta</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherProfile;
