ALTER TABLE models ADD COLUMN model_info TEXT;
delete from  models where id=6;
drop table models;