"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getProfileValidation,
  type ProfileValidation,
} from "@/validation/profile.validation";
import { useTranslation } from "react-i18next";
import { profile } from "@/lib/data/profile";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/shared/image-upload";
import { User, Mail, Calendar, Edit, X, Check } from "lucide-react";
import { FadeInUp } from "@/components/shared/animate";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | string | undefined>(
    profile.image || undefined
  );

  const form = useForm<ProfileValidation>({
    resolver: zodResolver(getProfileValidation(t)),
    defaultValues: {
      name: profile.name,
      username: profile.username,
      email: profile.email,
      dateOfBirth: profile.dateOfBirth || "",
      image: profile.image || "",
    },
  });

  const handleImageChange = (file: File | string) => {
    setImageFile(file);
    form.setValue("image", file);
  };

  const handleImageRemove = async (url: string) => {
    setImageFile(undefined);
    form.setValue("image", "");
  };

  const onSubmit = (data: ProfileValidation) => {
    console.log("Profile update data:", data);
    toast.success(t("profile.updateSuccess"));
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset();
    setImageFile(profile.image || undefined);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <FadeInUp>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{t("profile.title")}</CardTitle>
              <CardDescription>{t("profile.description")}</CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="w-4 h-4" />
                {t("common.update")}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                {/* Profile Image */}
                <div className="flex justify-center">
                  {isEditing ? (
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload
                              value={imageFile}
                              onChange={handleImageChange}
                              onRemove={handleImageRemove}
                              disabled={!isEditing}
                              label={t("profile.uploadImage")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white">
                      <User className="w-16 h-16" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.name")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing}
                          placeholder={t("profile.namePlaceholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.username")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing}
                          placeholder={t("profile.usernamePlaceholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.email")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={!isEditing}
                          placeholder={t("profile.emailPlaceholder")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.dateOfBirth")}</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="gap-2">
                      <X className="w-4 h-4" />
                      {t("common.cancel")}
                    </Button>
                    <Button type="submit" className="gap-2">
                      <Check className="w-4 h-4" />
                      {t("common.save")}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </FadeInUp>
    </div>
  );
}
